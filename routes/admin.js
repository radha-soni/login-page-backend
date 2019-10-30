const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").post((req, res) => {
  const email = req.body.email;

  User.findOneAndUpdate({ email }, { admin: true }, function(err, doc) {
    if (err) {
      throw err;
    } else {
      console.log("Updated");
    }
  });

  res.json({ error: true, message: "Admin added" });
});

module.exports = router;
