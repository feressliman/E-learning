const User = require('../models/user'); // Assurez-vous que le chemin est correct

// Get all users or filter by name if provided
exports.getUsers = async (req, res) => {
    const { name } = req.query; // Utiliser req.query pour les paramètres de requête
    try {
        const query = name ? { name } : {}; // Query based on name if provided
        const users = await User.find(query);
        console.log("Users Found: ", users);
        res.json({ msg: "Users Found", users });
    } catch (error) {
        console.error("Error retrieving users: ", error);
        return res.status(500).json({ msg: "Error retrieving users" });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const byid = await User.findById(id);
        if (!byid) {
            console.log("No user with this ID.");
            return res.status(404).json({ msg: "No user with this ID." });
        }
        console.log("User found:", byid);
        res.json({ msg: "User found", byid });
    } catch (error) {
        console.log("Error finding user:", error);
        return res.status(500).json({ msg: "Error finding user" });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    const { name, email, password, role, tel } = req.body;
    const photoprofile = req.file ? req.file.filename : 'default-avatar.png'; // Default value if no file is uploaded

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Create the user
        const newUser = new User({ name, email, password, role, tel, photoprofile });
        await newUser.save();

        console.log("Creation successful:", newUser);
        res.json({ msg: "Creation successful", newUser });
    } catch (error) {
        console.log("Error creating new user:", error);
        return res.status(500).json({ msg: "Error creating new user" });
    }
};

// Update an existing user
exports.updateUser = async (req, res) => {
    const { _id, name, email, password, role, tel, photoprofile } = req.body;
    try {
        const modifier = await User.findByIdAndUpdate(_id, { name, email, password, role, tel, photoprofile }, { new: true });
        if (!modifier) {
            console.log("User not found");
            return res.status(404).json({ msg: "User not found" });
        }
        console.log("Update successful:", modifier);
        res.json({ msg: "Update successful", modifier });
    } catch (error) {
        console.log("Error updating user:", error);
        return res.status(500).json({ msg: "Error updating user" });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    const { _id } = req.params;
    try {
        const userToDelete = await User.findByIdAndDelete(_id);
        if (!userToDelete) {
            return res.status(404).json({ msg: "No user found with this ID." });
        }
        res.json({ msg: "Delete successful." });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ msg: "Error deleting user" });
    }
};

// Get user profile
exports.getProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};
