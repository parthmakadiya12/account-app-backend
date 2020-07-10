import express from "express";
import UserSchema from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import get from "lodash/get";
import * as config from "../config/config";

const router = express.Router();
const generateAuthToken = function (_id, username) {
  const token = jwt.sign({ _id: _id, username: username }, config.myprivatekey);
  return token;
};

const verifyAuthToken = function (token) {
  try{
    const isValid = jwt.verify(token, config.myprivatekey);
    return true;  
  }catch(e){
    return false;
  }
};

router.get("/health", (req, res, next) => {
  res.status(200).send({ status: "up" });
});

router.post("/login", (req, res, next) => {
  //validate with db and send back the token maybe use jwt
  const { username, password } = req.body;
  UserSchema.findOne(
    {
      username: username,
    },
    (err, store) => {
      bcrypt.compare(password, get(store, "password", ""), function (
        err,
        result
      ) {
        if (result === true) {
          console.log("login Success for : " + username);
          const token = generateAuthToken(store._id, store.username);
          res.header("x-auth-token", token);
          res.status(200).send({
            token: token,
            userData: {
              name: store.name,
              surname: store.surname,
              email: store.email,
              username: store.username,
            },
          });
        } else {
          console.log("login Failed for : " + username);
          res.status(401).send({
            message: "Password is wrong for given user.Please check again.",
          });
        }
      });
    }
  );
});

router.post("/signup", (req, res, next) => {
  //create a new user and add data to db
  //name,email,phone,username,password
  const user = new UserSchema({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    securityQue: req.body.securityQue,
    securityAns: req.body.securityAns,
    username: req.body.username,
    password: req.body.password,
  });
  user
    .save()
    .then(() => {
      console.log("Signup Success for : " + req.body.username);
      res.status(200).send({
        status: "success",
      });
    })
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        console.log("Signup Error for : " + req.body.username);
        return res.status(422).send({
          succes: false,
          message: "User already exist! Check Username and Email",
        });
      } else {
        console.log("Error Happened at Signup. Error is", err);
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      }
    });
});

export default router;
