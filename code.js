const mongoose = require("mongoose")

const CodeSchema = new mongoose.Schema({
    code : {
        required : true,
        type : String,
    },
    encrypted_data : {
        required : true,
        type : String,
    },
    iv :{
        type : String,
        required : true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
    type: Date,
    required: true,
  },

});

CodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


const Code = mongoose.model("code",CodeSchema);
module.exports = Code;