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
  // Get all users with pets you haven't made a connection with
  // By user.id
  // A connection status is either requested(1), accepted(2), or declined(3)
  // Is declining a request the same thing as pass?
  // Should this be a pet route instead?
  // Assisted by Ahmed, Victoria, and Mikias(mentors)
  router.get("/:id", (req, res) => {
    // const userId = parseInt(req.params.id)
    const userId = req.session.user_id
    db.query(
      `SELECT pets.name AS pet, 
              pets.quirky_fact AS quirky_fact, 
              pets.profile_photo AS photo,
              users.first_name AS owner 
      FROM users 
      JOIN pets ON users.id = pets.owner_id
      WHERE users.id 
      NOT IN (SELECT sender_id AS id 
              FROM connections
              WHERE receiver_id = $1 
              UNION SELECT receiver_id AS id 
              FROM connections 
              WHERE sender_id = $1) 
      AND users.id != $1;`
      , [userId])
    .then(result => {
      res.json({
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Retrieved all the pets you have not connected with'
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
    // const userId = parseInt(req.params.id)
    const userId = req.session.user_id
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
        user: userId,
        result: result.rows,
        message: 'Retrieved all the pets of a single user'
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
    const userId = req.session.user_id
    db.query(
      `UPDATE users
      SET first_name=$1, last_name=$2, email=$3, city=$4, post_code=$5, profile_photo=$6
      WHERE id=$7`
      , [req.body.first_name, req.body.last_name, req.body.email, req.body.city, req.body.post_code, req.body.profile_photo, userId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
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
    // const userId = parseInt(req.params.id)
    const userId = req.session.user_id
    db.query(
      `DELETE FROM users
      WHERE id = $1`
      , [userId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
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