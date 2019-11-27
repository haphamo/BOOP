const router = require("express").Router();

module.exports = db => {
  // Get all users
  router.get("/", (req, res) => {
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
  // const user = request.session.user_id;
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
      res.status(201)
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

  // Edit an existing user's info by id
  // const user = request.session.user_id;
  router.put("/:id", (req, res) => {
    db.query(
      `UPDATE users
      SET first_name=$1, last_name=$2, email=$3, city=$4, post_code=$5, profile_photo=$6
      WHERE id=$7`
      , [req.body.first_name, req.body.last_name, req.body.email, req.body.city, req.body.post_code, req.body.profile_photo, parseInt(req.params.id)])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        result: result.rows,
        message: 'Updated the info of an existing user' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Delete an existing user by id
  // const user = request.session.user_id;
  router.delete("/:id", (req, res) => {
    const userId = parseInt(req.params.id)
    db.query(
      `DELETE FROM users
      WHERE id = $1`
      , [userId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        message: `Removed ${result.rowCount} user` 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  return router;
};