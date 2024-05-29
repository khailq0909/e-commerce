const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: { 
    type: String,
    required: true, 
    lowercase: true 
},
  des: { 
    type: String, 
    required: true 
},
  price: { 
    type: Number, 
    required: true 
},
  images: [],
  imagesfilenames:[],
  category: { 
    type: mongoose.Types.ObjectId, 
    ref: "Category", 
},
  quantity: { 
    type: Number, 
    default: 0 
},
  color: {
    type: String,
    enum: ["Black", "White", "Space Gray", "Gold", "Silver"],
  },
  sold: { 
    type: Number, 
    default: 0 
},
  ratings: [
    {
      star: { type: Number },
      postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
      comment: { type: String },
    },
  ],
  totalRatings: {
    type: Number,
    default: 0,
  },
},{
    timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);
