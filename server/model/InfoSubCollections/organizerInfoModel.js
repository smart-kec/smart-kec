const mongoose = require('mongoose');


const members = new mongoose.Schema({
    
    memberKey : {
        type : String,
        trim : true
    },
    memberDesignation : {
        type : String,
        trim : true
    }
});

const organizerInfoSchema = new mongoose.Schema({
    organizationName : {
        type:String,
        required : [true,"An organzer must have name of his/her organization"],
        unique : true
    },
    collegeName : {
        type : String,
        required : [true, "An organization must have a college name"]
    },
    organizationLogo : {
        type : String,
        required : [true, "need of organization logo"],
        unique : true
    },
    organizationType : {
        type : String,
        required : [true, "What type of Organization?"]
    },
    organizationProgramme : {
        type : [String],
        required : [true,"To which Programme the organization belongs?"],
        default : []
    },
    organizationBranch : {
        type : [String],
        required : [true, "To which branch(es) the organization belongs to ?"],
        default : []
    },
    organizationDescription : {
        type : String,
        required : [true, "Required : A description about the organization"]
    },
    organizationEvents : {
        type : [String],
        default : []
    },

    coOrdinatorsKey : {
        type : [String],
        default : []
    },
    organizationMembers : [members],

    organizationEmail : {
        type : String,
        trim : true,
        unique : true,
        required : [true, "Email required for contact purposes"]
    },

    organizationPhoneNumber : {
        type : String,
        trim : true
    }

});


const organizationModel = mongoose.model("organizerinfo",organizerInfoSchema);

module.exports = organizationModel;