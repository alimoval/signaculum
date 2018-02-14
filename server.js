const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const apiHandler = require('./routes/apiHandler');
const users = require('./routes/users');

const app = express();

// CORS Middlewear
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport Middlewear
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api', apiHandler);
app.use('/users', users);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
