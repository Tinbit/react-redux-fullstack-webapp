const mongoose = require('mongoose');
const requireLogin = require ('../middlewares/requireLogin');
const requireCredits = require ('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks',(req,res) => {
    res.send('Thanks for voting!');
  });


  app.post('/api/surveys', requireLogin, requireCredits,  async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      //title:title es6 condencing it down
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      //for every string in an array we map over it map fucn takes every single obj in an array
      //run some fcn for individual email address recipients.split(',').map(email => { return {email: email (value: key)}})
      //for every email address in the obj that has email address return email
      _user: req.user.id,
      dateSent: Date.now()
    });

    //Great place to send and email!
    const mailer = new Mailer(survey,surveyTemplate(survey)); //surveytemplet ->html body ,survey arg-> subject & recipants
try{
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
  });
};
