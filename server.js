const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/compatibility_test', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a User model
const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    answers: [Number]
}));

// Define routes
app.post('/submit', async (req, res) => {
    const { name, answers } = req.body;
    const user = new User({ name, answers });
    await user.save();
    res.send({ message: 'User data saved successfully' });
});

app.post('/compatibility', async (req, res) => {
    const { name1, answers1, name2, answers2 } = req.body;

    // Simple name compatibility calculation (e.g., based on the length of names)
    const nameCompatibility = 100 - Math.abs(name1.length - name2.length) * 10;

    // Simple personality compatibility calculation (e.g., based on answer differences)
    let personalityCompatibility = 0;
    for (let i = 0; i < answers1.length; i++) {
        personalityCompatibility += (4 - Math.abs(answers1[i] - answers2[i])) * 25;
    }
    personalityCompatibility /= answers1.length;

    // Overall compatibility
    const overallCompatibility = (nameCompatibility + personalityCompatibility) / 2;

    res.send({ nameCompatibility, personalityCompatibility, overallCompatibility });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
