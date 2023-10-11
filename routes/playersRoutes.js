const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.post('/register', (req, res) => {
    let existingData = [];

    if (fs.existsSync('../public/players.json')) {
        try {
            const data = fs.readFileSync('../public/players.json', 'utf8');
            existingData = JSON.parse(data);
            if (!Array.isArray(existingData)) {
                existingData = [];
            }
        } catch (error) {
            console.error('Error reading players.json:', error);
            res.status(500).json({ message: 'Error reading players.json' });
            return;
        }
    }

    var apiBody = req.body;

    let hasCaptain = existingData.find(player => player.isCaptain === true);
    let hasWicketkeeper = existingData.find(player => player.isWicketkeeper === true);

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
        res.status(400).json({ message: "We have both wicketkeeper and captain" });
    }

    function AddPlayer() {
        existingData.push(apiBody);
        fs.writeFile('players.json', JSON.stringify(existingData), 'utf8', (err) => {
            if (err) {
                console.error('Error writing data to the file:', err);
                res.status(500).json({ message: 'Error writing data to the file' });
            } else {
                console.log('Data has been written to players.json');
                res.json({ message: 'Data has been successfully updated' });
            }
        });
    }
});

module.exports = router;
