const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {

        const { Email, Password } = req.body
        if (!Email) return res.status(400).send({ status: false, messsage: "please enter email" })
        if (!Password) return res.status(400).send({ status: false, messsage: "please enter Password" })


        if (Email === 'admin@codesfortomorrow.com', Password === 'Admin123!@#') {
            const token = jwt.sign({ Email }, process.env.SECRETKEY, { expiresIn: '24h' });
            return res.status(200).send({ status: true, messsage: 'user login successfully', token: token })

        } else {
            return res.status(400).send({ status: false, messsage: 'invalid credentials' })

        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, messsage: err.messsage })
    }
}