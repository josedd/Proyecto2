const {Router} =require('express');
const pool =require('../db');

const {getAllUsers,getUser,createUser,deleteUser,updateUser} =require('../controllers/users.controller');

const router = Router();

router.post("/users", createUser);

router.get("/users", getAllUsers);

router.get("/users/:user_email", getUser);

router.put("/users/:user_email", updateUser);

router.delete("/users/:user_email", deleteUser);
//coment

module.exports = router;