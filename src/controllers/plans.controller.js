const pool = require("../db");
//------------------------------------------------------------------------------------------ 
const createPlan = async (req, res, next) => {
  try {
    const { app_id,plan_description} = req.body;

    const newApp = await pool.query(
      "INSERT INTO dc_prj_plans ( app_id,plan_description) VALUES($1, $2) RETURNING *",
      [app_id,plan_description]
    );

    res.json(newApp.rows[0]);
  } catch (error) {
    next(error);
  }
};
//------------------------------------------------------------------------------------------ 
const getAllPlans = async (req, res, next) => {
  try {
    const allPlans = await pool.query("SELECT * FROM dc_prj_plans");
    res.json(allPlans.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------------------------------------------------------------ 
const getPlan = async (req, res,next) => {
  try {
    const { plan_id } = req.params;
    
    const result = await pool.query("SELECT * FROM dc_prj_plans WHERE plan_id = $1", [plan_id]);
   
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Plan not found" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//-----------------------------------------------------------------------------------------
const updatePlan = async (req, res,next) => {
  try {
    const {plan_id } = req.params;
    const {app_id,plan_description } = req.body;

    const result = await pool.query(
      "UPDATE dc_prj_plans SET app_id = $1,plan_description = $2 WHERE plan_id  = $3 RETURNING *",
      [app_id,plan_description ,plan_id ]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Plan not found" });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
  };
  //-----------------------------------------------------------------------------------------
  const deletePlan = async (req, res,next) => {
    try {
      const { plan_id } = req.params;
      const result = await pool.query("DELETE FROM dc_prj_plans WHERE  plan_id = $1", [plan_id]);
  
      if (result.rowCount === 0)
        return res.status(404).json({ message: "plan not found" });
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    createPlan,
    getAllPlans,
    getPlan,
    updatePlan,
    deletePlan,
  };