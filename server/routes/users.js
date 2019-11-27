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

  // Create a new user
  router.post("/register", (req, res) => {
    db.query(
      `INSERT INTO users (first_name, last_name, email, city, post_code, profile_photo)
      VALUES ($1, $2, $3, $4, $5, $6)`
      , [req.body.first_name, req.body.last_name, req.body.email, req.body.city, req.body.post_code, req.body.profile_photo])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        result: result.rows,
        message: 'Created a new user' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  return router;
};