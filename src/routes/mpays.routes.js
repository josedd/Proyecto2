const {Router} =require('express');
const pool =require('../db');

const {getAllMpays,getMpay,createMpay,deleteMpay,updateMpay} =require('../controllers/mpays.controller');

const router = Router();

router.post("/mpays", createMpay);

router.get("/mpays", getAllMpays);

router.get("/mpays/:mpay_id", getMpay);

router.put("/mpays/:mpay_id", updateMpay);

router.delete("/mpays/:mpay_id", deleteMpay);


module.exports = router;