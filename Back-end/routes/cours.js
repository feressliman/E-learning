const express = require('express'); 
const { check, validationResult } = require('express-validator'); 
const cour = require('../models/cour');
const formation = require('../models/formation');
const router = express.Router();

router.post( '/:formationId', 
    [ 
        check('titre', 'Title is required').not().isEmpty(), 
        check('description', 'description is required').not().isEmpty() 
    ], 
    async (req, res) => { 
        const errors = validationResult(req); 
        if (!errors.isEmpty()) { 
            return res.status(400).json({ errors: errors.array() });
         } 
         const { titre, description } = req.body; 
         try {
             const formation = await Formation.findById(req.params.formationId); 
             if (!formation) { 
                return res.status(404).json({ msg: 'Course not found' }); 
            } 
            const cour = new Cour({ titre, description, cour: cour._id }); 
            await cour.save(); 
            formation.cours.push(cour._id); 
            await formation.save(); res.json(cour); 
        }
         catch (err) { 
            console.error(err.message); res.status(500).send('Server error'); 
        } 
    } );

    // Obtenir toutes les leçons d'un cours 
    router.get('/:formationId', 
        async (req, res) => { 
            try { 
                const formation = await Formation.findById(req.params.formationId).populate('cours');
                     if (!formation) {
                         return res.status(404).json({ msg: 'Formation not found' }); } 
                        res.json(formation.cours); 
                    } 
                    catch (err) { 
                        console.error(err.message); 
                        res.status(500).send('Server error'); 
                    } 
                });

                router.delete('/:formationId/:courId', async (req, res) => {
                    try {
                        const formation = await Formation.findById(req.params.formationId);
                        if (!formation) {
                            return res.status(404).json({ msg: 'formation pas trouvé' });
                        }
                        const cour = await Cour.findById(req.params.courId);
                        if (!cour) {
                            return res.status(404).json({ msg: 'Cour pas trouvé' });
                        }
                        // Vérification si la leçon appartient bien au cours
                        if (cour.formation.toString() !== req.params.formationId) {
                            return res.status(400).json({ msg: 'Ce cour n"appartient pas à la formation' });
                        }
                        // Supprimer la leçon
                        await cour.remove();
                        // Supprimer la référence de la leçon dans le cours
                        formation.cours = formation.cours.filter(
                            courId => courId.toString() !== req.params.courId
                        );
                        await formation.save();
                        res.json({ msg: 'Cour supprime ' });
                    } catch (err) {
                        console.error(err.message);
                        res.status(500).send('Server error');
                    }
                });
    


module.exports = router;






