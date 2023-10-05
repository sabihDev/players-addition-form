const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/register', (req, res) => {
    res.body = fs.readFileSync('players.json', 'utf8');
})

router.post('/register', (req, res) => {
    let existingData = [];
    try {
        existingData = JSON.parse(fs.readFileSync('./public/players.json', 'utf8'));
    } catch (error) {
        console.error('Error reading players.json:', error);
    }

    var apiBody = req.body;

    let hasCaptain = existingData.find(player => player.isCaptain === true);
    let hasWicketkeeper = existingData.find(player => player.isWicketkeeper === true);

    console.log(hasCaptain, hasWicketkeeper);
    if ((hasCaptain === undefined && apiBody.isCaptain === true) && (hasWicketkeeper === undefined && apiBody.isWicketkeeper === true)) {
        AddPlayer()
    }
    else if (hasCaptain === undefined && apiBody.isCaptain === true) {
        AddPlayer();
    }
    else if (hasWicketkeeper === undefined && apiBody.isWicketkeeper === true) {
        AddPlayer();
    }
    else if (apiBody.isWicketkeeper === false && apiBody.isCaptain === false) {
        AddPlayer();
    }
    else {
        res.send("We have both wicketkeeper and captain");
    }

    function AddPlayer() {
        existingData.push(req.body);
        fs.writeFile('./public/players.json', JSON.stringify(existingData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to players.json:', err);
                res.status(500).json({ error: 'Error writing data to the file' });
            } else {
                console.log('Data has been written to players.json');
                res.json({ message: 'Data has been successfully updated' });
            }
        });
    }

});

module.exports = router;