
module.exports = (sequelize, Sequelize) => {
    const  Category  = sequelize.define("Category", {
        categoryName: {
        type: Sequelize.STRING
        },
        

    });

    return Category;
};


