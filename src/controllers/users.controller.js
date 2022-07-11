const pool = require("../db");
//------------------------------------------------------------------------------------------ 
const createUser = async (req, res, next) => {
  try {
    const { user_names,user_lastname1,user_lastname2,user_email,user_password } = req.body;

    const newUser = await pool.query(
      "INSERT INTO dc_prj_users (user_names,user_lastname1,user_lastname2,user_email,user_password) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [user_names,user_lastname1,user_lastname2,user_email,user_password]
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    next(error);
  }
};

//comment
//------------------------------------------------------------------------------------------ 
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await pool.query("SELECT * FROM dc_prj_users");
    res.json(allUsers.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------------------------------------------------------------ 
const getUser = async (req, res,next) => {
  try {
    const { user_email } = req.params;
    
    const result = await pool.query("SELECT * FROM dc_prj_users WHERE user_email = $1", [user_email]);
   
    if (result.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
//-----------------------------------------------------------------------------------------
const updateUser = async (req, res,next) => {
  try {
    const { user_email } = req.params;
    const { user_names,user_lastname1,user_lastname2,user_password } = req.body;

    const result = await pool.query(
      "UPDATE dc_prj_users SET user_names = $1, user_lastname1 = $2, user_lastname2 = $3,user_password = $4 WHERE user_email = $5 RETURNING *",
      [user_names,user_lastname1,user_lastname2,user_password, user_email]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
  };
  //-----------------------------------------------------------------------------------------
  const deleteUser = async (req, res,next) => {
    try {
      const {  user_email } = req.params;
      const result = await pool.query("DELETE FROM dc_prj_users WHERE  user_email = $1", [ user_email]);
  
      if (result.rowCount === 0)
        return res.status(404).json({ message: "User not found" });
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
  };