const mongoose = require('mongoose');
const FormationSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    duree: {
        type: String,
        required: true
    },
    formateur: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    cour: [{ 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Cour' 
        }]

});
module.exports = mongoose.model('Formation', FormationSchema);