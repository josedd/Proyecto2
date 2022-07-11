const express = require("express");

const morgan = require("morgan");
const taskRoutes = require("./routes/tasks.routes");
const userRoutes = require ("./routes/users.routes");
const appRoutes = require ("./routes/apps.routes");
const planRoutes = require ("./routes/plans.routes");
const mpayRoutes = require ("./routes/mpays.routes");
const appuserRoutes = require ("./routes/apps_users.routes");

const app = express();


// Middlewares

app.use(morgan('dev'));
app.use(express.json());

app.use(taskRoutes)
app.use(userRoutes)
app.use(appRoutes)
app.use(planRoutes)
app.use(mpayRoutes)
app.use(appuserRoutes)

// manejo de errores
app.use((err, req, res, next) => {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  });


app.listen(4000)
console.log('Server on port 4000')