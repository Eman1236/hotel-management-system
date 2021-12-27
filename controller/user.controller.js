const model = require("../model/index");
const Joi = require("joi");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
const {Op} = require("sequelize");

const passwordSchema = Joi.object({
    password: Joi.string()
        .min(4)
        .required()
});

// access config var
function generate_accessTokens(username) {
    //   console.log("username",username);
    const ts = process.env.TOKEN_SECRET;
    return jwt.sign({
        ...username
    }, ts, { expiresIn: '7d' });
}

exports.login = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        const email = req.body.email;
        const password = req.body.password;
        console.log("Credentials:", email,password);
        const data = await model.User.findOne({ where: { email: email, password: password } });
        console.log('data: ', data.dataValues);
        if (data) {
                const user = {
                    "id": data.id,
                    "name": data.name,
                    "email": data.email,
                    "role": data.role,
                    "createdAt": data.createdAt
                }
                // console.log(data);
                const tokengen = generate_accessTokens(user);
                console.log("T:",tokengen);
                res.send({ "Status":{Message: "Success", Token: tokengen, Role: user.role}});
        }

    }
    catch (error) {
        console.log("In Catch..");
        res.send({ "Status":{Message: error.message}});
    }
};
