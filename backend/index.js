const express = require('express');
const {
    Pool,
    Client
} = require('pg');
const app = express();
const port = 3005;

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
});

app.get('/data', function(req, res) {
    pool.query('SELECT stdname, email from name_and_email', [], (err, result) => {
        if (err) {
            return res.status(405).jsonp({
                error: err
            });
        }

        return res.status(200).jsonp({
            data: result.rows
        });

    });
});

app.listen(port, () => console.log(`Backend rest api listening on port ${port}!`))