const mongoose = require("mongoose");

// 1. CREATE THE SCHEMA
const coffeeSchema = new mongoose.Schema({
    name: String,
    isReadyToEnjoy: Boolean,
  });


//   2. REGISTER THE MOEL

const Coffee = mongoose.model("Coffee", coffeeSchema);

// 3.SHARE IT WITH THE REST OF THE APP
module.exports = Coffee;