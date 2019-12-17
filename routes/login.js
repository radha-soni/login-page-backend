const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.find({ email })
    .then(user => {
      if (user.length) {
        if (password === user[0].password) {
          if (user[0].admin) {
            User.find().then(resp => {
              res.json({
                error: false,
                message: "Admin Login Successful",
                admin: true,
                users: resp,
                user: user[0]
              });
            });
          } else {
            User.find().then(resp => {
              res.json({
                error: false,
                message: "Login Successful",
                admin: false,
                user: user[0]
              });
            });
          }
        } else if (email === user[0].email && password !== user[0].password) {
          console.log("Invalid password");
          res.json({ error: true, message: "Invalid password" });
        }
      }
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
