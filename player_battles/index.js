const axios = require('axios');
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1', apiVersion: '2012-08-10'});
exports.handler = (event, context, callback) => {
    const options = {
        headers: { 'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzE3LCJpZGVuIjoiMjQ3MzU0MTU4MTI5MDg2NDY1IiwibWQiOnsidXNlcm5hbWUiOiJTaGVyY2xvY2siLCJrZXlWZXJzaW9uIjozLCJkaXNjcmltaW5hdG9yIjoiODY3NiJ9LCJ0cyI6MTU0MTkxNDUyNzkwMX0.44tlqXTET6GCj1Z5uZs8NIBZHmHTDwZKgBvAGCYCMms' }
    }

    axios.get('https://api.royaleapi.com/player/RL08YC29/battles', options)
        .then(function (response) {
            // handle success
            const result = response.data;

            const params = {
              RequestItems: {
                "player_battles": []
              }
            };

            const putList = [];
            for (let i = 0; i < result.length; i++) {
                result[i].player_tag = 'RL08YC29';
                result[i].date = Date.now();
                const asd = {};
                asd.PutRequest = {
                    Item: result[i]
                }
                putList.push(asd);
            }

            params.RequestItems.player_battles = putList;
            console.log(params);
            docClient.batchWrite(params, function(err, data) {
                if (err) {
                    console.log('asdsss');
                    callback(err, null);
                } else {
                    callback(null, "SUCCESS");
                }
            });
        })
        .catch(function (error) {
            // handle error
            console.log('asd');
            console.log(error);
        });
};