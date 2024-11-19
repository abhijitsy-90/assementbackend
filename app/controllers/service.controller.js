const { where } = require("sequelize")
const db = require("../models")
const servicemodel = db.Service
const servicePriceModel = db.ServicePrice
const { Op } = require('sequelize');


exports.addService = async (req, res) => {
    try {

        const categoryId = req.params.categoryId
        const { serviceName, type, price } = req.body
        const servicedata = {
            categoryId, serviceName, type, price
        }

        const storeservicedata = await servicemodel.create(servicedata)
        return res.status(200).send({ status: true, message: 'service add successfully', data: storeservicedata })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


exports.getService = async (req, res) => {
    try {

        const categoryId = req.params.categoryId

        const data = await servicemodel.findAll({ where: { categoryId: categoryId } })

        return res.status(200).send({ status: true, message: 'data fetch successfully', data: data })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }
}


exports.removeService = async (req, res) => {
    try {

        const { categoryId, serviceId } = req.params

        const destroyservice = await servicemodel.destroy({ where: { categoryId: categoryId, id: serviceId } })
        if (!destroyservice) return res.status(404).send({ status: false, message: `service not found for this category id ${categoryId}and service id ${serviceId}` })
        return res.status(200).send({ status: true, message: "service remove successfully" })


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }
}

exports.updateserviceandremoveserviceprice = async (req, res) => {

    const { categoryId, serviceId } = req.params;
    const { serviceName, type, priceOptions } = req.body;
    try {
        const service = await servicemodel.findOne({ where: { id: serviceId, categoryId } });

        if (!service) {
            return res.status(404).json({ message: "Service not found for the given category." });
        }


        if (serviceName) service.serviceName = serviceName;
        if (type) service.type = type;
        await service.save();


        if (Array.isArray(priceOptions)) {
            for (const option of priceOptions) {
                const { id, duration, price, optionType } = option;

                if (id) {

                    const existingOption = await servicePriceModel.findOne({ where: { id, serviceId } });
                    if (existingOption) {
                        existingOption.duration = duration || existingOption.duration;
                        existingOption.price = price || existingOption.price;
                        existingOption.type = optionType || existingOption.type;
                        await existingOption.save();
                    }
                } else {

                    await servicePriceModel.create({
                        serviceId,
                        duration,
                        price,
                        type: optionType,
                    });
                }
            }

            const optionIdsToKeep = priceOptions.map(option => option.id).filter(id => id);
            await servicePriceModel.destroy({
                where: {
                    serviceId,
                    id: { [Op.notIn]: optionIdsToKeep },
                },
            });
        }

        return res.status(200).json({ message: "Service and price options updated successfully." });
    } catch (error) {
        console.error("Error updating service:", error);
        return res.status(500).json({ message: "An error occurred while updating the service." });
    }

}