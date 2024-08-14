const express = require('express'); 
const { check, validationResult } = require('express-validator'); 
const router = express.Router();
const formation = require('../models/formation');
const cour = require('../models/cour');

// Créer un cours (Admin seulement) 
router.post( '/',
     [ 
        check('titre', 'Title is required').not().isEmpty(), 
    check('description', 'Description is required').not().isEmpty() ,
    check('duree', 'duree is required').not().isEmpty() ],

 async (req, res) => { const errors = validationResult(req);
     if (!errors.isEmpty()) { 
        return res.status(400).json({ errors: errors.array() }); } 
        const { titre, description, duree } = req.body; 
        try { 
            const formation = new Formation({ titre, description, duree, formateur: req.session.userId }); 
            await formation.save(); res.json(formation); } 
            catch (err) { console.error(err.message); 
                res.status(500).send('Server error'); 
            } } );


//Obtenir tous les cours 
router.get('/', async (req, res) => { 
    try { 
        const formations = await Formation.find().populate('formateur', 'name'); 
        res.json(formations); 
    } 
    catch (err) { 
        console.error(err.message);
         res.status(500).send('Server error');
         } });


module.exports = router;

//Supprimer une formation (Admin seulement)
router.delete('/:formationId', async (req, res) => {
    try {
        const formation = await Formation.findById(req.params.id);
        if (!formation) {
            return res.status(404).json({ msg: 'formation pas trouve' });
        }
        // Vérification si l'utilisateur est le formateur  du formation ou un admin
        if (formation.formateur .toString() !== req.session.userId) {
            return res.status(401).json({ msg: 'Utilisateur non autorisé' });
        }
        await formation.remove();
        res.json({ msg: 'formation supprime' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});













