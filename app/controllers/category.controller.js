const { where } = require("sequelize");
const db = require("../models");
const categoryModel = db.Category

exports.storeCategory = async (req, res) => {
    try {
        const { categoryName } = req.body
        if (!categoryName) return res.status(400).send({ status: false, messsage: 'please enter categoryName' })
        const data = await categoryModel.create({ categoryName })
        return res.status(200).send({ status: true, messsage: 'category store successfully', data: data })

    } catch (err) {
        return res.status(500).send({ status: false, messsage: err.messsage })
    }
}


exports.getAllCategories = async (req, res) => {
    try {

        const allCategories = await categoryModel.findAll({ where: {} })
        return res.status(200).send({ status: true, messsage: "all categories fetch successfully", data: allCategories })

    } catch (err) {
        return res.status(500).send({ status: false, messsage: err.messsage })

    }
}

exports.updateCategory = async (req, res) => {
    try {

        const categoryId = req.params.categoryId
        const { categoryName } = req.body
        const categoryData = await categoryModel.findOne({ where: { id: categoryId } })
        if (!categoryData) return res.status(404).send({ status: false, messsage: `category not present for this id ${categoryId}` })
        categoryData.categoryName = categoryName
        await categoryData.save()
        return res.status(200).send({ status: true, messsage: 'category update successfully' })

    } catch (err) {
        return res.status(500).send({ status: false, messsage: err.messsage })
    }
}



exports.deleteCategoryById = async (req, res) => {
    try {

        const categoryId = req.params.categoryId
        const categoryData = await categoryModel.destroy({ where: { id: categoryId } })
        if (!categoryData) return res.status(400).send({ status: false, messsage: `category not present for this id ${categoryId}` })
        return res.status(200).send({ status: true, messsage: "category deleted successfully" })
    } catch (err) {
        return res.status(500).send({ status: false, messsage: err.messsage })

    }
}