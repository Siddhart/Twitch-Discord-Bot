# Twitch Stream Notification Bot
Discord bot that will be able to keep your members up-to-date whenever a streamer goes live. Uses the Official Twitch Api

# How does it work?
This Discord bot uses [The Official Twitch Api](https://dev.twitch.tv/docs/api/). You will be able to assign unlimited streamers to the bot. The bot uses the api to fetch the channel data to see if the streamer is live. If the streamer is live it will send a message in the assigned channel and it will also tag the assigned role. You will be able to choose the update time. If the streamer is still live the bot will update the message after X amount of time (default 10 minutes).  

<img src="https://cdn.discordapp.com/attachments/738800765023551660/821513567265226803/unknown.png" />  

Check out [stoiss2's channel on Twitch](https://www.twitch.tv/stoiss2)

# Installation
First you will have to clone the project.
```console
$ git clone https://github.com/Siddhartt/Twitch-Stream-Notifyer
```

After that open the config.json file
```console
{
    "DiscordServerId": "DISCORD_GUILD_ID(REQUIRED)",
    "token": "DISCORD_API_BOT_TOKEN(REQUIRED)",
    "twitch_clientID": "TWITCH_API_CLIENT_ID(REQUIRED)",
    "twitch_secret": "TWITCH_API_SECRET(REQUIRED)",
    "cron": "*/10 * * * * *",
    "channelID": "CHANNELD_ID(REQUIRED)",
    "roleID": "ROLE_ID(NOT REQUIRED)",
    "channels": [
        {
            "ChannelName": "STREAMER_NAME(REQUIRED)",
            "DiscordServer": "DISCORD_SERVER_INVITE_URL(NOT REQUIRED)",
            "twitch_stream_id": "",
            "discord_message_id": ""
        }
    ],
    "authToken": ""
}
```
## Edit Config.json
- DiscordServerId - Copy and past your Discord server ID here.
- token - Enter your [Discord bot token](https://discord.com/developers/applications) here.
- twitch_clientID - Enter the Twitch application client ID here ([Twitch Developer Console](https://dev.twitch.tv/console/apps)).
- twitch_secret - Generate a api token on the Twitch application page.
- cron - Enter your Update/check interval here ([Cron Guru](https://crontab.guru/)).
- channelID - Copy and Paste the Discord channel ID here (The notifications will be send in this channel).
- roleID - Copy and past the Discord Role ID here (This field is NOT required. Please assign "" to this if you don't want to tag any roles).

NOTE: Do NOT add anything in the fields that are already empty. These fields will automatically update.

## Add streamers
In the config.json there is a channels array. If you want to add streamers you just add new objects to this array.
```console
{
   "ChannelName": "STREAMER_NAME(REQUIRED)",
   "DiscordServer": "DISCORD_SERVER_INVITE_URL(NOT REQUIRED)",
   "twitch_stream_id": "",
   "discord_message_id": ""
}
```
- ChannelName - Enter the streamer login name here. This name is the same as the name in the channel URL.  
Example: 
URL = https://www.twitch.tv/stoiss2  
ChannelName = stoiss2  
- DiscordServer - This field is not required but if the Streamer has their own Discord server you could add the invite url here.  
  
An array with multiple streamers will look something like this:
```console
{
   "ChannelName": "STREAMER1",
   "DiscordServer": "Some Discord invite url here",
   "twitch_stream_id": "",
   "discord_message_id": ""
},
{
   "ChannelName": "STREAMER2",
   "DiscordServer": "",
   "twitch_stream_id": "",
   "discord_message_id": ""
}
```

## dependencies
In order for the bot to work properly you will have to install the node packages discord.js, cron and request. Use the following command to install the dependencies.
```console
$ npm install discord.js cron request
```

## Run the bot
After you updated the config.json and installed the dependencies you can run the final command.
Use the command in the same directory as the index.js file.
```console
$ node index.js
```
Congratulations! You have successfully setup the bot.
If there are any errors please send me a dm on Discord
Siddhartt#2194
