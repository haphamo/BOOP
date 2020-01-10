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

  // Create a new user
  router.post("/", (req, res) => {
    db.query(
      `INSERT INTO users (first_name, last_name, email, password, city, post_code, profile_photo)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`
      , [req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.city, req.body.post_code, req.body.profile_photo])
    .then(result => {
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
  
  // Get a single user
  router.get("/:id", (req, res) => {
    const userId = parseInt(req.params.id)
    db.query(`SELECT * FROM users WHERE users.id = $1`, [userId])
    .then(result => {
      res.json({
        status: 'Success',
        result: result.rows,
        message: 'Retrieved a single user'
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Edit an existing user's info by id
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
  router.delete("/:id", (req, res) => {
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

  // Get all the pets of a single user
  router.get("/:id/pets", (req, res) => {
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

  // Get all your friends
  // If a user has more than one pet - you will be friends with all of their pets
  // Only the user that is logged in can see their friends
  // Status: Friend Request ACCEPTED
  router.get("/:id/friends", (req, res) => {
    const userId = req.session.user_id
    db.query(
      `SELECT pets.id AS pet_id,
              pets.name AS pet, 
              pets.profile_photo AS pet_photo,
              users.first_name AS owner,
              users.profile_photo AS owner_photo
      FROM users 
      JOIN pets ON users.id = pets.owner_id
      WHERE users.id 
      IN (SELECT sender_id AS id
          FROM connections
          WHERE receiver_id = $1
          AND connections.status = $2
          UNION SELECT receiver_id AS id 
          FROM connections 
          WHERE sender_id = $1
          AND connections.status = $2) 
      AND users.id != $1`
      , [userId, 'ACCEPTED'])
    .then(result => {
      res.json({
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Retrieved all the best friends of a single user'
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Get all users with pets you haven't made a connection with by user.id
  // A connection status is either PENDING, ACCEPTED, or PASSED
  // Is declining a request the same thing as pass? Yes
  // Assisted by Ahmed, Victoria, and Mikias(mentors)
  router.get("/:id/dashboard", (req, res) => {
    const userId = req.session.user_id
    db.query(
      `SELECT pets.id AS pet_id,
              pets.name AS pet, 
              pets.quirky_fact AS quirky_fact, 
              pets.profile_photo AS photo,
              users.first_name AS owner,
              users.id as owner_id
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

  // Send a Friend Request(PENDING) or Pass(PASSED)
  // Only the owner that is logged in can make a connection
  router.post("/:id/notifications", (req, res) => {
    const userId = req.session.user_id
    const receiverId = req.body.receiver_id
    const status = req.body.status
    db.query( 
      `INSERT INTO connections (sender_id, receiver_id, status)
      VALUES ($1, $2, $3)`
      , [userId, receiverId, status])
    .then(result => {
      res.json({
        status: 'Success',
        user: userId,
        result: result.rows,
        message: `${status}`
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Get all pending friend requests (NOTIFICATIONS)
  // If a user has more than one pet - the request will include all pets
  // Only the user that is logged in can see their friend requests
  // Status: PENDING friend request
  router.get("/:id/notifications", (req, res) => {
    const userId = req.session.user_id
    db.query(
      `SELECT pets.id AS pet_id,
              pets.name AS pet, 
              pets.profile_photo AS pet_photo,
              users.id AS receiver_id,
              users.first_name AS owner,
              users.profile_photo AS owner_photo
     FROM users 
     JOIN pets ON users.id = pets.owner_id
     WHERE users.id 
     IN (SELECT sender_id AS id
             FROM connections
             WHERE receiver_id = $1
             AND connections.status = $2) 
     AND users.id != $1`
      , [userId, 'PENDING'])
    .then(result => {
      res.json({
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Retrieved all the friend requests of a single user'
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Accept a Friend Request
  // Only the owner that is logged in can make a connection
  router.post("/:id/notifications/accept", (req, res) => {
    const userId = req.session.user_id
    const senderId = req.body.sender_id
    // const status = req.body.status
    db.query( 
      `UPDATE connections 
      SET status=$1
      WHERE sender_id=$2
      AND receiver_id=$3
      AND status=$4`
      , ['ACCEPTED', parseInt(senderId), parseInt(userId), 'PENDING'])
    .then(result => {
      console.log(result)
      res.json({
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Accepted friend request'
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Decline a Friend Request
  // Only the owner that is logged in can make a connection
  router.post("/:id/notifications/decline", (req, res) => {
    const userId = req.session.user_id
    const senderId = req.body.sender_id
    // const status = req.body.status
    db.query( 
      `UPDATE connections 
      SET status=$1
      WHERE sender_id=$2
      AND receiver_id=$3
      AND status=$4`
      , ['DECLINED', senderId, userId, 'PENDING'])
    .then(result => {
      res.json({
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Declined friend request'
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  return router;
};