module.exports = app => {

    const categoryController = require("../controllers/category.controller");
    const serviceController=require("../controllers/service.controller")
    const { authenticate } = require('../middlewares/user.middleware');

    var router = require("express").Router();
    router.post("/category", authenticate, categoryController.storeCategory)

    router.get("/categories", authenticate, categoryController.getAllCategories)

    router.put("/category/:categoryId", authenticate, categoryController.updateCategory)

    router.delete("/category/:categoryId", authenticate, categoryController.deleteCategoryById)

    router.post("/category/:categoryId/service",authenticate,serviceController.addService)

    router.get("/category/:categoryId/services",authenticate,serviceController.getService)

    router.delete("/category/:categoryId/service/:serviceId",authenticate,serviceController.removeService)

    router.put("/category/:categoryId/service/:serviceId",authenticate,serviceController.updateserviceandremoveserviceprice)

    app.use(router);
};
