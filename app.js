
const express = require('express');
const app = new express();
const fs = require('fs');
app.use(express.json());
const logger = require('morgan');
// const { stringify } = require('querystring');
app.use(logger('dev'));
const data = require('./dataSet.json');

// GET requests to retrieve data from the server only.

app.get("/Hospital_name", (req, res) => {
    res.send(data);
});

// POST is used to send data to a server to create/update a resource.

app.post("/Hospital_name", (req, res) => {

    data.push(req.body);
    fs.writeFile('dataSet.json', JSON.stringify(data), (err, resp) => {
        if (err) {
            res.send("Data cannot be added");
        }
        else {
            res.send("Data added successfully");
        }
    });
});

//  PUT request creates a resource or updates an existing resource.

app.put('/Hospital_name/:name', (req, res) => {
    let name = req.params.name;

    data.forEach((item) => {

        if (item.Hospital_name == name) {

            item.Hospital_Reg_id = req.body.Hospital_Reg_id;
            item.Patient_count = req.body.Patient_count;
            item.Hospital_location = req.body.Hospital_location;
        }
    });

    fs.writeFile('dataSet.json', JSON.stringify(data), (err, resp) => {
        if (err) {

            res.send("Data could not be updated");
        }
        else {
            res.send("Data Updated!");
        }

    });

});
// DELETE method is used to delete a resource from the server.

app.delete('/Hospital_name/:name', (req, res) => {
    let name = req.params.name;
    let value = data.filter(item => item.Hospital_name !== name);

    fs.writeFile('dataSet.json', JSON.stringify(value), (err, resp) => {
        if (err) {
            res.send("Data cannot be deleted!");
        }
        else {
            res.send("Data Deleted!");
        }
    });

});

app.listen(5000);
console.log("Server listening to PORT:5000");
