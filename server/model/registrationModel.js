const mongoose = require ('mongoose');

const studentDetailsSchema = new mongoose.Schema({
    studentName : {
        type : String,
        required : [true,"A registered student must have a name"]
    },
    studentRollNo : {
        type : String,
        required : [true,"A registered student must have a roll number"]
    },
    studentEmailId : {
        type : String,
        trim : true
    },
    studentPhoneNumber : {
        type : String,
        trim : true
    }
});

const registeredStudentsInfoSchema = new mongoose.Schema({

    studentDetails : {
        type : [studentDetailsSchema],
        default : []
    },

    isSelectedParticipant : {
        type : Boolean,
        required : [true, "Required : Has Participant selected?"],
        default : false
    },
    studentDocument : {
        type : String
    }
});

const selectedParticipantsSchema = new mongoose.Schema({
    studentName : {
        type : String,
        required : [true,"A registered student must have a name"]
    },
    studentRollNo : {
        type : String,
        required : [true,"A registered student must have a roll number"]
    },
    studentEmailId : {
        type : String,
        trim : true
    },
    participantAttendence : {
        type : Boolean,
        required : [true, "Required : Participant Attendence"],
        default : false
    }
});

const registeredFestEventsSchema = new mongoose.Schema({
    eventName : {
        type : String,
        required : [true, "Fest must contain an Event name"],
        trim : true
    },
    registeredStudentsInfo : {
        type : [registeredStudentsInfoSchema],
        default : []
    },
    selectedParticipantAttendence : {
        type : [selectedParticipantsSchema],
        default : []
    }
});

const registrationSchema = new mongoose.Schema({
    registrationFestId : {
        type : String,
        required : [true, "An event must have an event id"],
        trim : truemongoose
    },
    festName : {
        type : String,
        required : [true, "Event name is must for the new Event"],
        unique : true,
        trim : true
    },
    festOrganizer : {
        type : String,
        required : [true, "Organizer for an event is must"]
    },
    registeredFestEvents : {
        type : [registeredFestEventsSchema],
        default : []
    }
});

const registrationModel = mongoose.model("registrationinfo",registrationSchema);

module.exports = registrationModel;