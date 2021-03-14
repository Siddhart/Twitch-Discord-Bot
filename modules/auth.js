//https://id.twitch.tv/oauth2/token?client_id=cjalen1za0dglvuks1xgesq5uuz63e&client_secret=p5sjcsilhbj6n30to2k6sdqgf1ko4y&grant_type=client_credentials
const request = require('request')

async function getKey(clientID, clientSecret) {
    return new Promise((resolve, reject) => {
        request.post(
            `https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`,
            (error, res, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                try{
                    resolve(JSON.parse(body).access_token)
                }catch(e){
                    reject(e)
                }
            }
        )
    });
}

module.exports = { getKey };