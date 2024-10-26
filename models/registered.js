const mongoose  = require("mongoose");

const schema = mongoose.Schema;





const regSchema = new schema({
    email : {
        type : String,
        required: true
    },
    name: {
        type : String,
        required: true
    },
    whatsapp : {
        type : String,
        required: true
    }
});




module.exports = mongoose.model("Register", regSchema);