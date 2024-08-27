const express = require('express'); 
const router = express.Router();
//const cour = require('../models/cour');
const {getFormations, getFormationById, createFormation, updateFormation, deleteFormation} = require('../controllers/formationController');



router.get('/getFormations', getFormations);
router.get('/getFormationbyId/:_id', getFormationById);
router.post('/createFormation', createFormation);
router.put('/updateFormation', updateFormation);
router.delete('/deleteFormation/:_id', deleteFormation);



module.exports = router;











