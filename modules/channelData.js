const request = require('request')

async function getData(channelName, clientID, authkey) {
    return new Promise((resolve, reject) => {
        var headers = {
            'client-id': clientID,
            'Authorization': `Bearer ${authkey}`
        };
        request.get(
            `https://api.twitch.tv/helix/search/channels?query=${channelName}`,{headers:headers},
            (error, res, body) => {
                if (error) {
                    return console.error(error)
                }
                try{
                    resolve(JSON.parse(body).data[0])
                }catch(e){
                    reject(e)
                }
            }
        )
    });
}

module.exports = { getData };
