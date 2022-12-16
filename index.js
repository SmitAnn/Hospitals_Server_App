// Using require method

const data = require("./dataSet.json");
console.log(data);

// Using the fs method

const fs = require("fs");

//Read dataSet.json file

fs.readFile("dataSet.json", function (err, data) {
    if (err)
        throw err;

    const data1 = JSON.parse(data);
    console.log(data1);

});

// Writing to a JSON file
let data2 = {
    "Hospital_name": "Parth Hospital",
    "Hospital_Reg_id": 34,
    "Patient_count": 125,
    "Hospital_location": "Sagar"
};
data.push(data2);

fs.writeFile("dataSet.json", JSON.stringify(data), err => {
    if (err) throw err;
    console.log("Done Writing");
});