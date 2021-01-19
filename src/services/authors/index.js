const router = require("express").Router();

const Model = require("../../utilities/model/model.js");

const Authors = new Model("authors");

router.get("/", async (req, res, next) => {
  try {
    const response = await Authors.findOne(req.query);
    res.send(response);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { rows } = await Authors.findById(req.params.id);
    res.send(rows);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await Authors.save(req.body);
    res.send(response);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await Authors.findByIdAndUpdate(req.params.id, req.body);
    res.send(response);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rows } = await Authors.findByIdAndDelete(req.params.id);
    res.send(rows);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
