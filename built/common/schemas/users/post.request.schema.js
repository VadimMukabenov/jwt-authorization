var yup = require('yup');
var userSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(3).max(10).required()
});
module.exports = userSchema;
