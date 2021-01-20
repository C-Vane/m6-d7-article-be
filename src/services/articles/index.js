const router = require("express").Router();

const Model = require("../../utilities/model/model.js");

const Articles = new Model("articles");

router.get("/", async (req, res, next) => {
  try {
    const response = await Articles.findOne(req.query);
    res.send(response);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { rows } = await Articles.findByIdArticle(req.params.id);
    res.send(rows[0].json_build_object);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await Articles.save(req.body);
    res.send(response);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await Articles.findByIdAndUpdate(req.params.id, req.body);
    res.send(response);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rows } = await Articles.findByIdAndDelete(req.params.id);
    res.send(rows);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
