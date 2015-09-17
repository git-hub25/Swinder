//Changed var User to var Couple in all instances for clarity

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Couple = mongoose.model('Couple');
var passport = require('passport');
var Salts = mongoose.model("Salts");

//register----------------------------------------------------------------------------------------------------------
router.post('/register', function(req, res) {
  var couple = new Couple(req.body);
  //Save couple with passwordHash field blank
  couple.save(function(err, couple) {
    if (err) console.log(err);
    if (err) return res.status(500).send({
      err: "Issues with Swinder's server :/"
    });
      if (!couple) return res.status(400).send({
        err: 'You messed up!'
      });
    //Creates salt with id from new couple as reference
    var salt = new Salts({
      coupleId: couple._id
    });
    //Sets salt string with SaltSchema method on Salts.js with crypto 64 bytes
    salt.setSalt();
    //Saves salt
    salt.save(function(err, salt) {
      if (err) return res.status(500).send({
        err: "Issues with Swinder's server :/"
      });
        if (!salt) return res.status(400).send({
          err: 'You messed up!'
        });
      //Update scouple with reference to salt with salt._id
      Couple.update({
        _id: salt.coupleId
      }, {
        salt: salt._id
      }, function(err, coupleWithSaltId) {
        if (err) return res.status(500).send({
          err: "Issues with Swinder's server :/"
        });
          if (!coupleWithSaltId) return res.status(400).send({
            err: 'You messed up!'
          });
        //Finds couple to populate salt string to change reference id of salt to actual salt object
        Couple.findOne({
          _id: salt.coupleId
        })
        .populate({
          path: "salt",
          model: "Salts",
          select: "salt"
        })
        .exec(function(err, coupleWithSaltString) {
          if (err) return res.status(500).send({
            err: "Issues with Swinder's server :/"
          });
            if (!coupleWithSaltString) return res.status(400).send({
              err: 'You messed up!'
            });
            //Hashes the password with salt with Couple setPassword method defined in Couple.js
            //Seconf param needs to be .salt.salt because salt is object with salt property that contains salt string from crypto
            coupleWithSaltString.setPassword(coupleWithSaltString.passwordHash, coupleWithSaltString.salt.salt);
            Couple.update({
              _id: coupleWithSaltString._id
            }, coupleWithSaltString, function(err, result) {
              if (err) return res.status(500).send({
                err: "Issues with Swinder's server :/"
              });
                if (!result) return res.status(400).send({
                  err: 'You messed up!'
                });
                  res.send();
                });
          });
});
});
});
});

//-----------------LOGGING IN COUPLE---------------------------------------------------------
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, couple, info) { //-----NOT REACHING PASSPORT.JS 9.16 1:50am
    if (!couple) return res.status(400).send(info);
    res.send({
      token: couple.generateJWT()
    });
  })(req, res, next);
});

//-------------------------------------------------------------------------------------------

//getting an individual couple
router.param('id', function(req, res, next, id) {
  Couple.findOne({
    _id: id
  }, function(err, couple) {
    if (err) return next({
      err: err,
      type: 'client'
    });
      req.couple = couple;
      next();
    });
});

//GET /couples
router.get('/', function(req, res) {

  var couples = res;
  Couple.find({})
  .exec(function(err, couples) {
    if (err) return res.status(500).send({
      err: "Error inside the server."
    });
      if (!couples) return res.status(400).send({
        err: "Couples aren't here :("
      });
        res.send(couples)
      });
});

//GET /couple & Update /{coupleId}-----------------------------------
router.get('/:id', function(req, res) {
  res.send(req.couple);
});

router.put('/:id', function(req, res) {
  var coupleProfile = req.body;
  Couple.update({_id: req.body._id}, coupleProfile)
  .exec(function(err, couple){
    console.log(couple + "line135coupleroutes")
    if(err) return res.status(500).send({err: "error getting couple to edit"});
    if(!couple) return res.status(400).send({err: "couple profile isn't existing"});
    res.send(couple);
    console.log("140coupleroutes" + couple)
  });
});

module.exports = router;
