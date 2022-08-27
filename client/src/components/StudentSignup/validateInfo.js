const  validateInfo  =(values) =>{
    let errors = {}

    // if(!values.studname.trim()) {
    //     errors.studname = "Name required"
    // }

    // if(!values.studemail) {
    //     errors.studemail = "Email required" }else 
    if(!/([a-zA-Z]+)[.]([0-9]+)([a-z0-9]+)@kongu([.])edu/i.test(values.studemail)){
    errors.studemail = "Email address is invalid"
    }

    // if(!values.phone) {
    //     errors.phone = "Phone No required" } else 
    if (values.phone.length !== 10){
        errors.phone = "Phone Numbers should have 10"
    }

    // if(!values.password) {
    //     errors.password = "Password required" } else 
    if (values.passwords.length < 8){
        errors.password = "Password needs to be atleat 8 characters"
    }
    else if(!"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"){
        errors.password = "Not strong enough(Atleast 1 uppercase,1 lowercase,1 number"
    }

    // if(!values.password2) {
    //     errors.password2 = "Confirm your password!"} else 
    if (values.password2 !== values.password){
        errors.password2 = "Passwords do not match"
    }

    return errors;
}

module.exports = validateInfo