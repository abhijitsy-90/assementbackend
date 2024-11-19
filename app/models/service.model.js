
module.exports = (sequelize, Sequelize) => {
    const  Service   = sequelize.define("Service", {
        categoryId: {
        type: Sequelize.INTEGER
        },
        serviceName:{
            type: Sequelize.STRING
        },
        type:{
            type: Sequelize.ENUM('Normal', 'VIP'),
        },
        price:{
            type: Sequelize.INTEGER
        } 
        

    });

    return Service ;
};
