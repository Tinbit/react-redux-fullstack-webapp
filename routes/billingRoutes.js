const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req,res) => { //only this route needs the user to be authenticate
//console.log(req.body);
//if the user did not signed in inother word if passport
//did not find the user that is referenced in the cookie
if(!req.user) {
  return res.status(401).send({ error: 'You must login!'
  });
}

  const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

  req.user.credits += 5;
  const user = await req.user.save();
  //  console.log(charge);


  res.send(user);
  });
};
