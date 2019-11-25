const router = require("express").Router();

module.exports = db => {
  //get all users
  router.get("/", (req, res) => {
    // const user = request.session.user_id;
    db.query(`SELECT * FROM users`)
    .then(result => {
      res.json({
        status: 'Success',
        result: result.rows,
        message: 'Retrieved all the users'
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message });
    })
  });

  return router;
};