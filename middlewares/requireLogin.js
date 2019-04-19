//export single fuction we use name convention lower case
//imidiatly export error function
module.exports = (req, res, next) => { //wired up middleware
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!'});
  }

  next();
};
