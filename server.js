const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');



const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            // handle error, maybe send a server error response
            res.status(500).send('Server error');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = { ...req.body, id: uuidv4() };
    
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            // handle error, maybe send a server error response
            res.status(500).send('Server error');
            return;
        }
        const notes = JSON.parse(data);

        notes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) {
                // handle error, maybe send a server error response
                res.status(500).send('Server error');
                return;
            }
            res.json(newNote);
        });
    });
});




app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
