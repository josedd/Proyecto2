const {Router} =require('express');
const pool =require('../db');

const {getAllApps,getApp,createApp,deleteApp,updateApp} =require('../controllers/apps.controller');

const router = Router();

router.post("/apps", createApp);

router.get("/apps", getAllApps);

router.get("/apps/:app_id", getApp);

router.put("/apps/:app_id", updateApp);

router.delete("/apps/:app_id", deleteApp);


module.exports = router;