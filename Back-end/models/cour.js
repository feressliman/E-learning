const mongoose = require('mongoose');
const CourSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    formation: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Formation', 
         required: true 
        }

    
});
module.exports = mongoose.model('Cour', CourSchema);