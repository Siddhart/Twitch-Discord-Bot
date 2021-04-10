const Discord = require('discord.js');
const client = new Discord.Client();
var CronJob = require('cron').CronJob;
const fs = require('fs')

const Stream = require("./modules/getStreams.js")
const Auth = require("./modules/auth.js")
const Channel = require("./modules/channelData.js")
const config = require('./config.json')

//ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    //update the authorization key on startup
    UpdateAuthConfig()
});

//function that will run the checks
var Check = new CronJob(config.cron,async function () {
    const tempData = JSON.parse(fs.readFileSync('./config.json'))

    tempData.channels.map(async function (chan, i) {
        if (!chan.ChannelName) return;
        
        let StreamData = await Stream.getData(chan.ChannelName, tempData.twitch_clientID, tempData.authToken);
        if (StreamData.data.length == 0) return

        StreamData = StreamData.data[0]

        //get the channel data for the thumbnail image
        const ChannelData = await Channel.getData(chan.ChannelName, tempData.twitch_clientID, tempData.authToken)
        if (!ChannelData) return;

        //structure for the embed
        var SendEmbed = {
            "title": `🔴 ${StreamData.user_name} is now live`,
            "description": StreamData.title,
            "url": `https://www.twitch.tv/${StreamData.user_login}`,
            "color": 6570404,
            "fields": [
                {
                    "name": "Playing:",
                    "value": StreamData.game_name,
                    "inline": true
                },
                {
                    "name": "Viewers:",
                    "value": StreamData.viewer_count,
                    "inline": true
                },
                {
                    "name": "Twitch:",
                    "value": `[Watch stream](https://www.twitch.tv/${StreamData.user_login})`
                },
                (chan.DiscordServer ? {
                    "name": "Discord Server:",
                    "value": `[Join here](${chan.DiscordServer})`
                } : {
                    "name": "** **",
                    "value": "** **"
                })
            ],
            "footer": {
                "text": StreamData.started_at
            },
            "image": {
                "url": `https://static-cdn.jtvnw.net/previews-ttv/live_user_${StreamData.user_login}-640x360.jpg?cacheBypass=${(Math.random()).toString()}`
            },
            "thumbnail": {
                "url": `${ChannelData.thumbnail_url}`
            }
        }

        //get the assigned channel
        const sendChannel = client.guilds.cache.get(config.DiscordServerId).channels.cache.get(config.channelID)

        if (chan.twitch_stream_id == StreamData.id) {
            sendChannel.messages.fetch(chan.discord_message_id).then(msg => {
                //update the title, game, viewer_count and the thumbnail
                msg.edit({ embed: SendEmbed })
            });
        } else {
            //this is the message when a streamer goes live. It will tag the assigned role
            await sendChannel.send({ embed: SendEmbed }).then(msg => {
                const channelObj = tempData.channels[i]
                
                channelObj.discord_message_id = msg.id
                channelObj.twitch_stream_id = StreamData.id
                
                if(config.roleID){
                    sendChannel.send(`<@&${config.roleID}>`)
                }
            })
        }
        //save config with new data
        fs.writeFileSync('./config.json', JSON.stringify(tempData))
    })
});

//update the authorization key every hour
var updateAuth = new CronJob('0 * * * *', async function () {
    UpdateAuthConfig()
});

//get a new authorization key and update the config
async function UpdateAuthConfig(){
    let tempData = JSON.parse(fs.readFileSync('./config.json'));

    //get the auth key
    const authKey = await Auth.getKey(tempData.twitch_clientID, tempData.twitch_secret);
    if (!authKey) return;

    //write the new auth key
    var tempConfig = JSON.parse(fs.readFileSync('./config.json'));
    tempConfig.authToken = authKey;
    fs.writeFileSync('./config.json', JSON.stringify(tempConfig));
}

//start the timers
updateAuth.start()
Check.start();

//login
client.login(config.token);
