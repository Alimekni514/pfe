const express = require("express");
const router = express.Router();
const Result = require("../models/Resultat");

router.post("/add", async (req, res) => {
  try {
    const { user, quizCode, score, name } = req.body;
    const result = new Result({ user, quizCode, score, name });
    await result.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
router.get("/results", async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
