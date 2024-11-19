module.exports = app => {

    const  user = require("../controllers/auth.controller");
    
    var router = require("express").Router();
  
   
      
    router.post("/login",user.login)
  
   
  
    app.use("/api/auth", router);
  };
  