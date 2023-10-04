const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/register', (req, res) => {
    console.log('This is register page');
})

router.post('/register', (req, res) => {
    let existingData = [];
    try {
        existingData = JSON.parse(fs.readFileSync('players.json', 'utf8'));
    } catch (error) {
        console.error('Error reading players.json:', error);
    }

    existingData.push(req.body);

    fs.writeFile('players.json', JSON.stringify(existingData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing to players.json:', err);
            res.status(500).json({ error: 'Error writing data to the file' });
        } else {
            console.log('Data has been written to players.json');
            res.json({ message: 'Data has been successfully updated' });
        }
    });
});

module.exports = router;