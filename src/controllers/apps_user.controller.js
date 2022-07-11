const pool = require("../db");
//------------------------------------------------------------------------------------------ 
const createAppUser = async (req, res, next) => {
  try {
    const {user_id ,app_id, plan_id, mpay_id, fecha_incio,fecha_fin,fecha_plazo_pago } = req.body;

    const newUser = await pool.query(
      "INSERT INTO dc_prj_apps_users (user_id ,app_id, plan_id, mpay_id, fecha_incio,fecha_fin,fecha_plazo_pago) VALUES($1, $2, $3, $4, $5,$6,$7) RETURNING *",
      [user_id ,app_id, plan_id, mpay_id, fecha_incio,fecha_fin,fecha_plazo_pago]
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    next(error);
  }
};
//------------------------------------------------------------------------------------------ 
const getAllAppsUser = async (req, res, next) => {
  try {
    const allUsers = await pool.query("SELECT * FROM dc_prj_apps_users");
    res.json(allUsers.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------------------------------------------------------------ 
const getAppUser = async (req, res,next) => {
  try {
    const { appser_id } = req.params;
    
    const result = await pool.query("SELECT * FROM dc_prj_apps_users WHERE appser_id = $1", [appser_id]);
   
    if (result.rows.length === 0)
      return res.status(404).json({ message: "UserApp not found" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//-----------------------------------------------------------------------------------------
const updateAppUser = async (req, res,next) => {
  try {
    const { appser_id  } = req.params;
    const { user_id ,app_id, plan_id, mpay_id, fecha_incio,fecha_fin,fecha_plazo_pago } = req.body;

    const result = await pool.query(
      "UPDATE dc_prj_apps_users SET user_id = $1, app_id = $2, plan_id = $3,mpay_id = $4, fecha_incio = $5,fecha_fin= $6, fecha_plazo_pago = $7 WHERE  appser_id = $8 RETURNING *",
      [user_id ,app_id, plan_id, mpay_id, fecha_incio,fecha_fin,fecha_plazo_pago, appser_id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "UserApp not found" });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
  };
  //-----------------------------------------------------------------------------------------
  const deleteAppUser = async (req, res,next) => {
    try {
      const {  appser_id } = req.params;
      const result = await pool.query("DELETE FROM dc_prj_apps_users WHERE   appser_id = $1", [  appser_id]);
  
      if (result.rowCount === 0)
        return res.status(404).json({ message: "UserApp not found" });
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    getAllAppsUser,
    getAppUser,
    createAppUser,
    deleteAppUser,
    updateAppUser
  };