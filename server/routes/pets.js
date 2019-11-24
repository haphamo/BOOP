const router = require("express").Router();

module.exports = db => {
  //get all pets
  router.get("/", (req, res) => {
    // const user = request.session.user_id;
    db.query(`SELECT * FROM pets`)
    .then(result => {
      res.status(200)
      res.json({ result: result.rows })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // get a single pet and its favourite things 
  router.get("/:id", (req, res) => {
    const petId = parseInt(req.params.id)
    db.query(
      `SELECT pets.name AS name, 
              pets.age AS age, 
              pets.breed AS breed, 
              pets.quirky_fact AS quirky_fact, 
              pets.profile_photo AS profile_photo,
              users.first_name AS owner,
              users.city AS home,
              pet_favourites.category AS category, 
              pet_favourites.name AS favourite_item
      FROM pets
      JOIN pet_favourites ON pet_id = pets.id
      JOIN users ON users.id = pets.owner_id
      WHERE pets.id = $1`
      , [petId])
    .then(result => {
      res.status(200)
      res.json({ result: result.rows })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // get a single pet's photos
  router.get("/:id/images", (req, res) => {
    const petId = parseInt(req.params.id)
    db.query(
      `SELECT *
      FROM pets
      JOIN images ON images.pet_id = pets.id
      WHERE pets.id = $1`
      , [petId])
    .then(result => {
      res.status(200)
      res.json({ result: result.rows })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  return router;
};

 // pg.query('INSERT INTO images (url, pet_id) VALUES ($1, $2)', [req.body.url, req.petId,])