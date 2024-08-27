const express = require('express'); 
const router = express.Router();
const {getCours, getCourById, createCour, updateCour, deleteCourFromFormation} = require('../controllers/courController');



                router.get('/getCours', getCours);
                router.get('/getCourbyId', getCourById);
                router.post('/createCour', createCour);
                router.put('/updateCour', updateCour);
                router.delete('/deleteCour', deleteCourFromFormation);
    


module.exports = router;






