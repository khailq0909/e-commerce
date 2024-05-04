const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    products:[
        {
            type: mongoose.Types.ObjectId,
            ref:"Product",
        }
    ]
},{
    timestamps: true,
});

module.exports = mongoose.model("Category", categorySchema);
