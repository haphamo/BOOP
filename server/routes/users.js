const router = require("express").Router();

module.exports = db => {
  // Get all users
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
      res.json({ error: err.message })
    })
  })

  // Get all the pets of a single user
  router.get("/:id/pets", (req, res) => {
    const userId = parseInt(req.params.id)
    db.query(
      `SELECT users.first_name AS owner,
              pets.name AS pet,
              pets.id as pet_id,
              users.city AS home,
              users.profile_photo AS user_avatar,
              pets.profile_photo AS pet_avatar
      FROM users
      JOIN pets ON owner_id = users.id
      WHERE users.id = $1`
      , [userId])
    .then(result => {
      res.json({
        status: 'Success',
        result: result.rows,
        message: 'Retrieved all the pets of a single user'
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  return router;
};