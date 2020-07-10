import express from "express";

const router = express.Router();

router.all("/", (req, res, next) => {
    res.send({
      success: true
    })
});

export default router;