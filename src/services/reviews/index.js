const router = require("express").Router();

const Model = require("../../utilities/model/model.js");

const Reviews = new Model("reviews");

router.get("/", async (req, res, next) => {
  try {
    const response = await Reviews.findOne(req.query);
    res.send(response);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { rows } = await Reviews.findById(req.params.id);
    res.send(rows);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await Reviews.save(req.body);
    res.send(response);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await Reviews.findByIdAndUpdate(req.params.id, req.body);
    res.send(response);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rows } = await Reviews.findByIdAndDelete(req.params.id);
    res.send(rows);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
