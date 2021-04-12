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
                    const channelTempData = JSON.parse(body).data
                    var doesExist = false
                    
                    for(let i = 0; i < channelTempData.length; i++){
                        if((channelTempData[i].broadcaster_login).toLowerCase() == channelName.toLowerCase()){
                            doesExist = true
                            resolve(JSON.parse(body).data[i])
                        }
                    }

                    if(!doesExist){
                        resolve(false)
                    }
                }catch(e){
                    reject(e)
                }
            }
        )
    });
}

module.exports = { getData };
