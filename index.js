const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const slashRouter = require('./routes/slashRoutes.js');
// const playerRouter = ;

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static site
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', slashRouter);
app.use('/players', require('./routes/playersRoutes.js'));

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});