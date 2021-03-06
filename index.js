const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

//mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI,{useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//configure the server essentially behaives correctly when it on production env
//run this only when its on in prod/heroku
if(process.env.NODE_ENV== 'production'){//1st check the specific app that matches the request if not...
  //Express will serve up production assets
  // like our main.js file, or main.css file!
app.use(express.static('client/build'));
  //Express will serve up the index.html file
  //if it doesnt recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);
