const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser, getProfile } = require('../controllers/userController');
const upload = require('../middleware/uploadMiddleware'); // Assurez-vous que le chemin est correct

router.get('/getUsers', getUsers);
router.get('/getUserById/:id', getUserById);
router.post('/createUser', upload.single('photoprofile'), createUser);
router.put('/updateUser', upload.single('photoprofile'), updateUser); // Ajoutez upload.single si photoprofile est également modifiable
router.delete('/deleteUser/:_id', deleteUser);
router.get('/getProfile/:id', getProfile);

module.exports = router;
