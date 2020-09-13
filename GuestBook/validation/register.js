const Validator = require('validator')
const isEmpty = require('is-empty');
module.exports = function validateRegisterationInputs(data) {
    let errors = {}

    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First Name is required"
    } else if (!Validator.isAlpha(data.firstName)) {
        errors.firstName = "First Name must only contain letters"
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last Name is required"
    } else if (!Validator.isAlpha(data.lastName)) {
        errors.lastName = "Last Name must only contain letters"
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required"
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Invalid Email"
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required"
    } else if (Validator.matches(data.password,'/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/','i')) {
        errors.password = "Password must be at least 8 characters long ,must contains at least one uppercase character,one lowercase character ,one number and one special character";
    }

    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm Password is required"
    } else if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Confirm Password must match Password"
    }

    return { errors, isValid: isEmpty(errors) }


}