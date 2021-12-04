const {
    singup,
    login,
    getAllUsers,
    getSingleUser,
    logout,
  } = require("../controllers/userControllers");
  const auth = require("../middlewares/auth");
  
const router = require("express").Router();
const singUpSchema = require("../bodySchema/signUpSchema.js");
 
  
  router.get("/", getAllUsers);
  router.get("/:id", getSingleUser);

  //router.post("/singup", singup)
  router.post("/singup", 
                        singUpSchema,
                        singup); 
  //empty is null value. So, it assume exist.
  //co check falsey value (null, "", 0,)
  router.post("/signin", login);
  router.post("/logout" , auth , logout)
  
  module.exports = router;
  