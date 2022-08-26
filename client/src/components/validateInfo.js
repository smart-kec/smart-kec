export default function validateInfo(values) {
    let errors = {}

    if(!values.studname.trim()) {
        errors.studname = "Name required"
    }

    if(!values.studemail) {
        errors.studemail = "Email required"
    }else if(!/([a-zA-Z]+)[.]([0-9]+)([a-z0-9]+)@kongu([.])edu/i.test(values.studemail)){
    errors.studemail = "Email address is invalid"
    }

    if(!values.password) {
        errors.password = "Password required"
    } else if (values.passwords.length < 8){
        errors.password = "Password needs to be atleat 8 characters"
    }

    if(!values.password2) {
        errors.password2 = "Confirm your password!"
    } else if (values.password2 !== values.password){
        errors.password2 = "Passwords do not match"
    }

    return errors;
}