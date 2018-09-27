const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const bowItem = require('./routes/api/bowItem');

//Bodyparser middleware
app.use(bodyParser.json());

//mongodb uri
const db = require('./config/keys').mongoURI;
//test change for github push
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/bowitem', bowItem);

//serve static if production
if(process.env.NODE_ENV == 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server started on port ${port}`));