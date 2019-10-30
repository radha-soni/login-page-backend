const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  User.find()
    .then(resp => {
      let newUser;

      if (resp.length) {
        newUser = new User({
          firstName,
          lastName,
          email,
          password,
          admin: false
        });
      } else {
        newUser = new User({
          firstName,
          lastName,
          email,
          password,
          admin: true
        });
      }

      newUser
        .save()
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
