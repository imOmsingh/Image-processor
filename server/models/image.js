const mongoose = require('mongoose');
const ImageSchema = new mongoose.Schema({
    fileName:{
        type:String,
        required:true,
        index:true
    },
    information:{
        type:Object
    }
})


module.exports = mongoose.model('ImageDetail',ImageSchema);