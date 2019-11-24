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
      res.json({ error: err.message });
    })
  });

  // get a single pet
  router.get("/:id", (req, res) => {
    const petId = parseInt(req.params.id);
    db.query(`SELECT * FROM pets WHERE id = $1`, [petId])
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