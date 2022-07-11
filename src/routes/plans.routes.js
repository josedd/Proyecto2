const {Router} =require('express');
const pool =require('../db');

const {getAllPlans,getPlan,createPlan,deletePlan,updatePlan} =require('../controllers/plans.controller');

const router = Router();

router.post("/plans", createPlan);

router.get("/plans", getAllPlans);

router.get("/plans/:plan_id", getPlan);

router.put("/plans/:plan_id", updatePlan);

router.delete("/plans/:plan_id", deletePlan);



module.exports = router;