const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET /notes - Returns notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'path_to_notes.html'));
});

// GET * - Returns index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'path_to_index.html'));
});

// API routes
// ...

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
