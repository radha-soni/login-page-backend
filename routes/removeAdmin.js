const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").post((req, res) => {
  const email = req.body.email;

  User.findOneAndUpdate({ email }, { admin: false }, function(err, doc) {
    if (err) {
      throw err;
    } else {
      console.log("removed");
    }
  });

  res.json({ error: true, message: "Admin removed" });
});

module.exports = router;
