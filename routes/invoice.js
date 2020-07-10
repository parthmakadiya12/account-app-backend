import express from "express";
import InvoiceSchema from "../models/invoiceSchema";
const router = express.Router();

router.post("/add", (req, res, next) => {
  const invoice = InvoiceSchema({
    username: req.user.username,
    type: req.body.type,
    amount: req.body.amount,
  });

  invoice
    .save()
    .then(() => {
      console.log("Invoice created for  : " + req.user.username);
      res.status(200).send({
        status: "success",
      });
    })
    .catch((err) => {
      console.log("We got an Error at Invoice add " + err);
      res.status(500).send({
        status: "failed",
        error: "err",
      });
    });
});

router.get("/", (req, res, next) => {
//TODO: add pagination here:
  try {
    InvoiceSchema.find({}, function (err, invoices) {
      res.status(200).send({ invoices });
    });
  } catch (e) {
    console.log("error while fetching invoices");
    res.status(500).send({
      status: "Error while fetching invoices",
    });
  }
});

export default router;
