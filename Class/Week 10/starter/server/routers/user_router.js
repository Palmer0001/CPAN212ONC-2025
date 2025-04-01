import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", (req, res) => {
  // 1 parse incoming information
  const { email, password } = req.body;

  //hash the infromation
  //run command: npm i bcryptjs
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      let newUser = new User({
        email,
        password: hashedPassword,
      });
      newUser
        .save()
        .then(() => {
          res.json({ message: "Account registered successfully" });
        })
        .catch((err) => {
          console.log(err);
          return res.json({ message: "Email already exists" });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ message: "Could not complete transaction" });
    });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }) //result: {} or {user_account}
    .then((user_account)=>{
        if(!user_account){
            res.json({message: "User account not found"});
        }
        bcrypt.compare(password, user_account.password)
        .then((isMatched)=>{
            if(!isMatched){
                return res.status(400).json({message: "Invalid password"});
            }
            return res.json({message: "Login successful"});
        }) //if it runs successfully
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ message: "Could not complete login" });
        });
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "Could not complete login" });
    });

});

// read
router.get("/fetch-all", (req, res)=>{
    // find
    // let filters = {};
    // if (req.query.title){
    //     filters.title = req.query.title
    // }

    // User.find(filters, {password: 0})
    User.find().then((result)=>{console.log(result)})
    res.end();
})

router.get("/itm/:id", (req, res)=>{
    // find
    // let filters = {};
    // if (req.query.title){
    //     filters.title = req.query.title
    // }

    // User.find(filters, {password: 0})
    User.find();
    User.findById(req.params.id)
    .then((result)=>{res.json(result)})
    // User.findByIdUpdate({id_value}, {updated key:values})
    User.findByIdDelete({id_value})
})






export default router;
