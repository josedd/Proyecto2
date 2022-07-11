const {Router} =require('express');
const pool =require('../db');

const {getAllAppsUser,getAppUser,createAppUser,deleteAppUser,updateAppUser} =require('../controllers/apps_user.controller');

const router = Router();

router.post("/appsuser", createAppUser);

router.get("/appsuser", getAllAppsUser);

router.get("/appsuser/:appser_id", getAppUser);

router.put("/appsuser/:appser_id", updateAppUser);

router.delete("/appsuser/:appser_id", deleteAppUser);


module.exports = router;