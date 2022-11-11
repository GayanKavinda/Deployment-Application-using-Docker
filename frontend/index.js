const express = require('express');
const request = require('request');

const app = express();
const port = 3004;
const restApiUrl = process.env.API_URL;

app.get('/', function(req, res) {
    request(
        restApiUrl, {
            method: "GET",
        },
        function(err, resp, body) {
            if (!err && resp.statusCode === 200) {
                var objData = JSON.parse(body);
                var c_cap = objData.data;
                var responseString = `<table border="1"><tr><td>Name</td><td>Email</td></tr>`;

                for (var i = 0; i < c_cap.length; i++)
                    responseString = responseString +
                      `<tr><td>${c_cap[i].stdname}</td><td>${c_cap[i].email}</td></tr>`;

                responseString = responseString + `</table>`;
                res.send(responseString);
            } else {
                console.log(err);
            }
        });
});

app.listen(port, () => console.log(`Frontend app listening on port ${port}!`))