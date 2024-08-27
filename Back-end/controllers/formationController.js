const Formation = require('../models/formation');

exports.getFormations = async (req, res) => {
    const { titre } = req.query; // Use req.query if you're passing parameters via query strings or to get from what we have on bd
    try {
        // Count documents that match the query
        const formCount = await Formation.countDocuments( titre );
        if (formCount == 0) {
            console.log("Not found any Formation....");
            return res.status(404).json({ msg: 'Not found any Formation....' });
        }
        // Find all documents that match the query
        const allFormation = await Formation.find( titre );
        if (formCount > 0) {
            console.log("Number of formations is " + formCount);
            console.log("The formations are "+ allFormation);
            return res.json({ count: formCount, formations: allFormation });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: 'There is a problem ...' });
    }
};

exports.getFormationById = async (req, res) => {
    const { _id } = req.params;

    try {
        const formation = await Formation.findById(_id);
        if (formation) {
            res.json(formation); 
        } else {
            res.status(404).json({ message: 'Formation not found' }); 
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

exports.createFormation = async (req, res) => {
    const { titre, description, duree, formateur } = req.body;

    try {
        
        const newFormation = new Formation({
            titre: titre,
            description: description,
            duree: duree,
            formateur: formateur
            
        });

        const savedFormation = await newFormation.save();

        
        res.status(201).json(savedFormation);
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};


//Mettre à jour un cours
exports.updateFormation = async (req, res) => {
    const { _id ,titre, description, duree, formateur , cour } = req.body; // Extract the updated fields from the request body
    try {
        // Find the formation by ID and update it with the new values
        const upd = await Formation.findByIdAndUpdate(_id,{titre, description, duree, formateur, cour});
        if (!upd) {
            console.log("No formation found to update...");
            return res.status(404).json({ msg: "No formation found to update..." });
        }
        console.log(upd)
        console.log("Update successful:", upd);
        return res.json({ msg: "Update successful", updatedFormation: upd });
    } catch (err) {
        console.log("Problem updating formation:", err.message);
        return res.status(500).json({ msg: "Problem updating formation..." });
    }
};

exports.deleteFormation = async (req, res) => {
    const { _id } = req.params; // Use params to get the ID from the URL
    try {
        const deletedFormation = await Formation.findByIdAndDelete(_id);
        if (!deletedFormation) {
            console.log("No formation found with this ID.");
            return res.status(404).json({ msg: "No formation found with this ID." });
        }
        console.log("Formation deleted successfully.");
        res.json({ msg: "Formation deleted successfully." });
    } catch (error) {
        console.log("Error deleting formation:", error);
        return res.status(500).json({ msg: "Error deleting formation." });
    }
};






