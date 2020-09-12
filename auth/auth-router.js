const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("./auth-model");
const restrict = require("./authenticate-middleware");

//-------------------//
// CREATE A NEW USER //
//-------------------//
router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Auth.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }

    const newUser = await Auth.add({
      username,
      password: await bcrypt.hash(password, 14),
    });

    res.status(201).json(newUser);
  } catch {
    next(err);
  }
});

  //-------//
  // LOGIN //
  //-------//
router.post("/login",  async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user =  await Auth.findBy({ username }).first();

    if (!user) {
      return res.status(401).json({
        message: "You Shall Not Pass",
      });
    }

    console.log(username)
    console.log(password)

    const passwordValid = bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const payload = {
      userID: user.id,
      username: user.username
    }

    const token = createToken(user)
    res.cookie(
      "token", 
      jwt.sign(payload, "i have brown hair")
    )

    // const token = jwt.sign(
    //   {
    //     userID: user.id,
    //     username: user.username
    //   },
    //   process.env.JWT_SECRET
    // );

    // res.cookie("token", token);

    res.json({
      message: `Welcome ${user.username}!`,
      token,
    });
  } catch (err) {
    next(err);
  }
});

function createToken(user){
  const payload = {
    userID: user.id,
    username: user.username
  }

  const options = {
    expiresIn: "1 hour", 
  }

  return jwt.sign(payload, "i have brown hair", options); 
}
module.exports = router;
