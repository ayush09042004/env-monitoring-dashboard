const express = require("express");
const Threshold = require("../models/Threshold");
const router = express.Router();

router.post("/", async (req, res) => {
    const rule = await Threshold.create(req.body);
    res.json(rule);
});

router.get("/", async (_, res) => {
    const rules = await Threshold.find();
    res.json(rules);
});

module.exports = router;
