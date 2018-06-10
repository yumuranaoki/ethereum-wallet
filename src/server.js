const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get("/", function(req, res) {
    res.send('index')
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})
