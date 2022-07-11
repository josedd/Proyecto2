const pool = require("../db");
//------------------------------------------------------------------------------------------ 
const createMpay = async (req, res, next) => {
  try {
    const { plan_id,mpay_duracion} = req.body;

    const newPlan = await pool.query(
      "INSERT INTO  dc_prj_mpays ( plan_id,mpay_duracion) VALUES($1, $2) RETURNING *",
      [plan_id,mpay_duracion]
    );

    res.json(newPlan.rows[0]);
  } catch (error) {
    next(error);
  }
};
//------------------------------------------------------------------------------------------ 
const getAllMpays = async (req, res, next) => {
  try {
    const allMpays = await pool.query("SELECT * FROM dc_prj_mpays");
    res.json(allMpays.rows);
  } catch (error) {
    next(error);
  }
};

//------------------------------------------------------------------------------------------ 
const getMpay = async (req, res,next) => {
    try {
      const { mpay_id } = req.params;
      
      const result = await pool.query("SELECT * FROM dc_prj_mpays WHERE  mpay_id = $1", [ mpay_id]);
     
      if (result.rows.length === 0)
        return res.status(404).json({ message: "Metodo Pago not found" });
  
      res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
  };
//-----------------------------------------------------------------------------------------
const updateMpay = async (req, res,next) => {
  try {
    const {mpay_id } = req.params;
    const { plan_id,mpay_duracion } = req.body;

    const result = await pool.query(
      "UPDATE dc_prj_mpays SET plan_id = $1,mpay_duracion = $2 WHERE mpay_id  = $3 RETURNING *",
      [ plan_id,mpay_duracion ,mpay_id ]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Metodo Pago not found" });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
  };
  //-----------------------------------------------------------------------------------------
  const deleteMpay = async (req, res,next) => {
    try {
      const { mpay_id } = req.params;
      const result = await pool.query("DELETE FROM dc_prj_mpays WHERE  mpay_id = $1", [mpay_id]);
  
      if (result.rowCount === 0)
        return res.status(404).json({ message: "Metodo Pago not found" });
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    createMpay,
    getAllMpays,
    getMpay,
    updateMpay,
    deleteMpay,
  };