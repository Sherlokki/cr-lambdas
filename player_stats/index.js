const axios = require('axios');
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});
exports.handler = (event, context, callback) => {
    const options = {
        headers: { 'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzE3LCJpZGVuIjoiMjQ3MzU0MTU4MTI5MDg2NDY1IiwibWQiOnsidXNlcm5hbWUiOiJTaGVyY2xvY2siLCJrZXlWZXJzaW9uIjozLCJkaXNjcmltaW5hdG9yIjoiODY3NiJ9LCJ0cyI6MTU0MTkxNDUyNzkwMX0.44tlqXTET6GCj1Z5uZs8NIBZHmHTDwZKgBvAGCYCMms' }
    }

    axios.get('https://api.royaleapi.com/player/RL08YC29', options)
        .then(function (response) {
            // handle success
            const result = response.data;

            delete result.cards;
            const dbParams = {
                Item: {},
                TableName: 'players'
            };

            dbParams.Item = result;
            dbParams.Item.date = Date.now();
            docClient.put(dbParams, function(err, data) {
                if (err) {
                    // handle error
                    callback(err, null);
                } else {
                    callback(null, "SUCCESS");
                }
            });
        })
        .catch(function (error) {
            // handle error
            console.log(JSON.stringify(error));
        });
};