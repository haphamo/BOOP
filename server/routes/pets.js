const router = require("express").Router();

module.exports = db => {
  // Get all pets
  router.get("/", (req, res) => {
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

  // Add a new pet
  // Removed the owner_id since we are using req.session.user_id now
  // Only the owner that is logged in can add a new pet on their profile
  router.post("/", (req, res) => {
    const userId = req.session.user_id
    db.query(
      `INSERT INTO pets (name, age, breed, quirky_fact, owner_id, profile_photo)
      VALUES ($1, $2, $3, $4, $5, $6)`
      , [req.body.name, parseInt(req.body.age), req.body.breed, req.body.quirky_fact, req.body.owner_id, req.body.profile_photo])
    .then(result => {
      res.status(201) 
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Added a new pet' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Get all pet photos
  router.get("/images", (req, res) => {
    db.query(
      `SELECT pets.id AS pet_id,
              pets.name AS name,
              images.id AS image_id,
              images.url AS photo 
      FROM images
      JOIN pets ON pets.id = pet_id`)
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

  // Get all pet favourites
  router.get("/favourites", (req, res) => {
    db.query(
      `SELECT pets.name AS pet,
              pet_favourites.category AS category, 
              pet_favourites.name AS favourite_item
      FROM pet_favourites
      JOIN pets ON pets.id = pet_id`)
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        result: result.rows,
        message: 'Retrieved all the pet favourites' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Get a single pet's profile information 
  // should do a check first if that pet:id exists
  router.get("/:id", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    db.query(
      `SELECT pets.name AS name, 
              pets.age AS age, 
              pets.breed AS breed, 
              pets.quirky_fact AS quirky_fact, 
              pets.profile_photo AS profile_photo,
              users.first_name AS owner,
              users.city AS home
      FROM pets
      JOIN users ON users.id = pets.owner_id
      WHERE pets.id = $1`
      , [petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Retrieved the profile information of a single pet' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Edit an existing pet's info by id
  // Changed owner_id as a value to userId since we are using req.session.user_id now
  // Only the owner that is logged in can edit the info of their pets
  router.put("/:id", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    db.query(
      `UPDATE pets
      SET name=$1, age=$2, breed=$3, quirky_fact=$4, profile_photo=$5
      WHERE id=$6`
      , [req.body.name, parseInt(req.body.age), req.body.breed, req.body.quirky_fact, req.body.profile_photo, petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Updated the info of an existing pet' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Delete an existing pet by id
  // Only the owner that is logged in can delete their pets
  router.delete("/:id", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    db.query(
      `DELETE FROM pets
      WHERE id = $1`
      , [petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        message: `Removed ${result.rowCount} pet` 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Get a single pet's photos by id
  router.get("/:id/images", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    db.query(
      `SELECT pets.id AS pet_id,
              pets.name AS name,
              images.id AS image_id,
              images.url AS photo 
      FROM pets
      JOIN images ON images.pet_id = pets.id
      WHERE pets.id = $1
      ORDER BY image_id DESC`
      , [petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Retrieved the images of a single pet' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Upload a new image
  // Only the owner that is logged in can upload a photo of their pet
  router.post("/:id/images", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    db.query(
      `INSERT INTO images (url, pet_id)
      VALUES($1, $2) RETURNING *`
      , [req.body.url, petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Added a new image' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Get a single pet's favourite items by id
  // ORDER BY favourite_id DESC (add later)
  router.get("/:id/favourites", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    db.query(
      `SELECT pets.id AS pet_id,
              pets.name AS pet_name,
              pet_favourites.id AS favourite_id,
              pet_favourites.name AS favourite_item,
              pet_favourites.category AS category
      FROM pets
      JOIN pet_favourites ON pet_id = pets.id
      WHERE pet_id = $1`
      , [petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Retrieved all the favourite items of a single pet' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Add a new favourite thing
  // Only the owner that is logged in can add a favourite thing for their pet
  router.post("/:id/favourites", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    db.query(
      `INSERT INTO pet_favourites (name, category, pet_id)
      VALUES($1, $2, $3)`
      , [req.body.favourite_item, req.body.category, petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: 'Added a new favourite item' 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Delete an image by id
  // Only the owner that is logged in can delete a photo of their pet
  router.delete("/:id/images/pid", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    const imageId = parseInt(req.params.images.id)
    db.query(
      `DELETE FROM images
      WHERE id = $1
      AND pet_id = $2`
      , [imageId, petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: `Deleted ${result.rowCount} image`
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  // Delete a favourite thing by id
  // Only the owner that is logged in can delete a favourite thing for their pet
  // Do we need the petId as well?
  router.delete("/:id/favourites/:fid", (req, res) => {
    const userId = req.session.user_id
    const petId = parseInt(req.params.id)
    const favouriteId = parseInt(req.params.pet_favourites.id)
    db.query(
      `DELETE FROM pet_favourites
      WHERE id = $1
      AND pet_id = $2`
      , [favouriteId, petId])
    .then(result => {
      res.status(200)
      res.json({ 
        status: 'Success',
        user: userId,
        result: result.rows,
        message: `Deleted ${result.rowCount} favourite item` 
      })
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message })
    })
  })

  return router;
};

