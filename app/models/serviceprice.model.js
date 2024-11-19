
module.exports = (sequelize, Sequelize) => {
    const  servicePrice   = sequelize.define("servicePrice", {
        serviceId: {
        type: Sequelize.INTEGER
        },
        Duration:{
            type: Sequelize.STRING
        },
        price:{
            type: Sequelize.INTEGER,
        },
        type: {
            type:Sequelize.ENUM('Hourly', 'Weekly', 'Monthly'),
          
          },
        

    });

    return servicePrice ;
};
