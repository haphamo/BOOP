const router = require("express").Router();

module.exports = db => {
  // Get all pets
  router.get("/", (req, res) => {
    // const user = request.session.user_id;
    db.query(`SELECT * FROM pets`)
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        result: result.rows,
        message: 'Retrieved all the pets' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Get all pet photos
  router.get("/images", (req, res) => {
    db.query(`SELECT * FROM images`)
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        result: result.rows,
        message: 'Retrieved all the pet pictures' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Get a single pet and its favourite things 
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
      res.json({ 
        status: 'Success',
        result: result.rows,
        message: 'Retrieved all the information about a single pet' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Get a single pet's photos
  router.get("/images/:id", (req, res) => {
    const petId = parseInt(req.params.id)
    db.query(
      `SELECT pets.name AS name,
              images.url AS picture
      FROM pets
      JOIN images ON images.pet_id = pets.id
      WHERE pets.id = $1`
      , [petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        result: result.rows,
        message: 'Retrieved the images of a single pet' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Add a new pet
  // Do we need to include owner_id here as well?
  // This will be associated with a form on the front-end
  // Trying to test with curl command - getting the following error : curl: (1) Protocol " http" not supported or disabled in libcurl
  router.post("/", (req, res) => {
    req.body.age = parseInt(req.body.age);
    db.query(
      `INSERT INTO pets (name, age, breed, quirky_fact, owner_id, profile_photo)
      VALUES($1, $2, $3, $4, $5, $6)`
      , [req.body.name, req.body.age, req.body.breed, req.body.quirky_fact, req.body.owner_id, req.body.profile_photo])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        result: result.rows,
        message: 'Added a new pet' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Upload a new image
  // There is an axios.post route to /api/pets/images - do we need a post route here as well?
  router.post("/images/:id", (req, res) => {
    const petId = parseInt(req.params.id)
    db.query(
      `INSERT INTO images (url, pet_id)
      VALUES($1, $2)`
      , [req.body.url, petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        result: result.rows,
        message: 'Added a new image' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Edit an existing pet's info
  // Included the owner_id for now
  // Not tested yet - curl command not working
  router.put("/:id", (req, res) => {
    db.query(
      `UPDATE pets
      SET name=$1, age=$2, breed=$3, quirky_fact=$4, owner_id=$5, profile_photo=$6
      WHERE id=$7`
      , [req.body.name, parseInt(req.body.age), req.body.breed, req.body.quirky_fact, req.body.owner_id, req.body.profile_photo, parseInt(req.params.id)])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        result: result.rows,
        message: 'Updated the info of an existing pet' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  return router;
};
