const Cour = require('../models/cour');
const Formation = require('../models/formation');
exports.getCours = async (req,res) => {
    const {titre } = req.body;
    try{
        const prend = await Cour.find(titre);
        if (!prend){
            console.log('No cours founds ....');
            return res.status(404).json({msg:'No cours founds ....'});
        }
        console.log('cours founded are :'+prend);
        res.json({cours:prend});

    }catch(err){
        console.error(err);
        return res.status(404).json({msg:"error on cant get cour ..."});
    }

};

exports.getCourById = async (req, res) => {
    const {_id} = req.body;

    try {
        const cour = await Cour.findById(_id);
        if (cour) {
            res.json(cour); 
        } else {
            res.status(404).json({ message: 'Course not found' }); 
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};


exports.createCour = async (req, res) => {
    const { titre, description, formation } = req.body;

    try {
        // Create the new course
        const newCour = new Cour({
            titre: titre,
            description: description,
            formation: formation 
        });

        // Save the new course
        const savedCour = await newCour.save();

        // Find the corresponding formation
        const existingFormation = await Formation.findById(formation);
        if (!existingFormation) {
            return res.status(404).json({ msg: 'Formation not found' });
        }

        // Add the course to the formation's course list
        existingFormation.cour.push(savedCour._id);
        await existingFormation.save();

        res.status(201).json(savedCour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateCour = async (req, res) => {
    const { titre, description, formation } = req.body;
    try {
        const cour = await Cour.findById(req.params.id);
        if (cour) {
            cour.titre = titre || cour.titre;
            cour.description = description || cour.description;
            cour.formation = formation || cour.formation; 
            const updatedCour = await cour.save();
            res.json(updatedCour);
        } else {
            res.status(404).json({ message: 'Cour not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a course from a formation
/*exports.deleteCourFromFormation = async (req, res) => {
    try {
        const { formationId, courId } = req.body;

        // Find the formation by ID
        const formation = await Formation.findById(formationId);
        if (!formation) {
            return res.status(404).json({ msg: 'Formation not found' });
        }

        // Find the course by ID
        const cour = await Cour.findById(courId);
        if (!cour) {
            return res.status(404).json({ msg: 'Cour not found' });
        }

        // Check if the course belongs to the formation
        if (cour.formation.toString() !== formationId) {
            return res.status(400).json({ msg: 'This cour does not belong to the formation' });
        }

        // Remove the course
        await cour.remove();

        // Remove the reference of the course from the formation's course list
        formation.cour = formation.cour.filter(courId => courId.toString() !== cour._id.toString());
        await formation.save();

        res.json({ msg: 'Cour deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};*/


exports.deleteCourFromFormation = async (req, res) => {
    try {
        const { formationId, courId } = req.body;

        // Find the formation by ID
        const formation = await Formation.findById(formationId);
        if (!formation) {
            console.log(`Formation with ID ${formationId} not found`);
            return res.status(404).json({ msg: 'Formation not found' });
        }

        // Find the course by ID
        const cour = await Cour.findById(courId);
        if (!cour) {
            console.log(`Cour with ID ${courId} not found`);
            return res.status(404).json({ msg: 'Cour not found' });
        }

        // Check if the course belongs to the formation
        if (cour.formation.toString() !== formationId) {
            console.log(`Cour with ID ${courId} does not belong to Formation with ID ${formationId}`);
            return res.status(400).json({ msg: 'This cour does not belong to the formation' });
        }

        // Delete the course
        await Cour.findByIdAndDelete(courId);

        // Remove the reference of the course from the formation's course list
        formation.cour = formation.cour.filter(id => id.toString() !== cour._id.toString());
        await formation.save();

        console.log(`Cour with ID ${courId} successfully deleted from Formation with ID ${formationId}`);
        res.json({ msg: 'Cour deleted successfully' });
    } catch (err) {
        console.error('Error deleting course from formation:', err.message);
        res.status(500).send('Server error');
    }
};
