/*
CREATE TABLE dc_prj_company( 
    id_company SERIAL PRIMARY KEY,
    name_company VARCHAR(255) UNIQUE,
    datos_company Json
);
*/

CREATE TABLE task( 
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE dc_prj_users( 
    user_id SERIAL PRIMARY KEY,
    user_names VARCHAR(50),
    user_lastname1 VARCHAR(50),
    user_lastname2 VARCHAR(50),
    user_email VARCHAR(50) UNIQUE ,
    user_password VARCHAR(50) 
);

CREATE TABLE dc_prj_apps( 
    app_id SERIAL PRIMARY KEY,
    app_name VARCHAR(50) UNIQUE,
    app_description VARCHAR(255),
    --app_img VARCHAR(255),
    app_url VARCHAR(255)
);

CREATE TABLE dc_prj_plans( 
    plan_id SERIAL PRIMARY KEY,
    app_id INTEGER,
    plan_description VARCHAR(255),
    --datos_plan Json,
     CONSTRAINT fk_app
      FOREIGN KEY(app_id) 
	  REFERENCES dc_prj_apps(app_id)
);

CREATE TABLE dc_prj_mpays( 
    mpay_id SERIAL PRIMARY KEY,
    plan_id INTEGER,
    mpay_duracion VARCHAR(255),
    CONSTRAINT fk_plan
      FOREIGN KEY(plan_id) 
	  REFERENCES dc_prj_plans(plan_id)
);

CREATE TABLE dc_prj_mpays( 
    mpay_id SERIAL PRIMARY KEY,
    plan_id INTEGER,
    mpay_duracion VARCHAR(255),
    CONSTRAINT fk_plan
      FOREIGN KEY(plan_id) 
	  REFERENCES dc_prj_plans(plan_id)
);

select * from dc_prj_mpays
SELECT * FROM dc_prj_mpays WHERE mpay_id 
CREATE TABLE dc_prj_apps_users( 
    appser_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    app_id INTEGER,
    plan_id INTEGER,
    mpay_id INTEGER,
    fecha_incio DATE,
    fecha_fin DATE,
    fecha_plazo_pago DATE,
    CONSTRAINT fk_au_user
      FOREIGN KEY(user_id) 
	  REFERENCES dc_prj_users(user_id),
    CONSTRAINT fk_au_app
      FOREIGN KEY(app_id) 
	  REFERENCES dc_prj_apps(app_id),
    CONSTRAINT fk_au_plan
      FOREIGN KEY(plan_id) 
	  REFERENCES dc_prj_plans(plan_id),
    CONSTRAINT fk_au_mpay
      FOREIGN KEY(mpay_id) 
	  REFERENCES dc_prj_mpays(mpay_id)
);