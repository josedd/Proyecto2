const pool = require("../db");
//------------------------------------------------------------------------------------------ 
const createApp = async (req, res, next) => {
  try {
    const { app_name,app_description,app_url} = req.body;

    const newApp = await pool.query(
      "INSERT INTO dc_prj_apps ( app_name,app_description,app_url) VALUES($1, $2, $3) RETURNING *",
      [ app_name,app_description,app_url]
    );

    res.json(newApp.rows[0]);
  } catch (error) {
    next(error);
  }
};
//------------------------------------------------------------------------------------------ 
const getAllApps = async (req, res, next) => {
  try {
    const allApps = await pool.query("SELECT * FROM dc_prj_apps");
    res.json(allApps.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------------------------------------------------------------ 
const getApp = async (req, res,next) => {
  try {
    const { app_id } = req.params;
    
    const result = await pool.query("SELECT * FROM dc_prj_apps WHERE app_id = $1", [app_id]);
   
    if (result.rows.length === 0)
      return res.status(404).json({ message: "App not found" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//-----------------------------------------------------------------------------------------
const updateApp = async (req, res,next) => {
  try {
    const {app_id } = req.params;
    const {app_name,app_description,app_url } = req.body;

    const result = await pool.query(
      "UPDATE dc_prj_apps SET app_name = $1,app_description = $2, app_url = $3  WHERE app_id  = $4 RETURNING *",
      [app_name,app_description,app_url,app_id ]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "App not found" });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
  };
  //-----------------------------------------------------------------------------------------
  const deleteApp = async (req, res,next) => {
    try {
      const { app_id } = req.params;
      const result = await pool.query("DELETE FROM dc_prj_apps WHERE  app_id = $1", [ app_id]);
  
      if (result.rowCount === 0)
        return res.status(404).json({ message: "App not found" });
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    createApp,
    getAllApps,
    getApp,
    updateApp,
    deleteApp,
  };