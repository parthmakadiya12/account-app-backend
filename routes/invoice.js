import express from "express";
import InvoiceSchema from "../models/invoiceSchema";
const router = express.Router();

router.post("/add", (req, res, next) => {
  const invoice = InvoiceSchema({
    username: req.user.username,
    type: req.body.type,
    amount: req.body.amount,
    note: req.body.note,
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
    InvoiceSchema.find({ username: req.user.username }, function (
      err,
      invoices
    ) {
      res.status(200).send({ invoices });
    });
  } catch (e) {
    console.log("error while fetching invoices", e);
    res.status(500).send({
      status: "Error while fetching invoices",
    });
  }
});

router.get("/total/count", (req, res, next) => {
  //TODO: add pagination here:
  try {
    let credit = 0,
      debit = 0;
    InvoiceSchema.find({ username: req.user.username }, function (
      err,
      invoices
    ) {
      invoices.map((i) => {
        if (i.type === "credit") {
          credit += i.amount;
        } else if (i.type === "debit") {
          debit += i.amount;
        }
      });
      res.status(200).send({
        credit,
        debit,
      });
    });
  } catch (e) {
    console.log("error while fetching invoices");
    res.status(500).send({
      status: "Error while fetching invoices",
    });
  }
});

export default router;
