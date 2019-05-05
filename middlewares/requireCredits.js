module.exports = (req, res, next) => { //wired up middleware
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits!'});
  }
next();

};
