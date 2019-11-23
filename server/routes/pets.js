const router = require("express").Router();

module.exports = db => {
  //get all pets
  router.get("/", (request, response) => {
    // const user = request.session.user_id;
    db.query(`SELECT * FROM pets`)
    .then(result => {
      response.json({result: result.rows})
    })
    .catch(err => {
      response
              .status(500)
              .json({ error: err.message });
    })
  });

  return router;
};