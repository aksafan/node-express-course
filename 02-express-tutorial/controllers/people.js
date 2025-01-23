const {people} = require("./../data");

const getPeople = (req, res) => {
    res.status(200).json({message: people});
};

const getPerson = (req, res) => {
    const id = Number(req.params.id);

    const person = people.find((p) => p.id === id);
    if (!person) {
        res.status(404).json({success: false, message: "No person found"});
    } else {
        res.status(201).json({success: true, message: person});
    }
};

const addPerson = (req, res) => {
    const {name} = req.body;

    if (!name) {
        res.status(400).json({success: false, message: "Please provide a name"});
    } else {
        people.push({id: people.length + 1, name: req.body.name});

        res.status(201).json({success: true, name: req.body.name});
    }
};

const updatePerson = (req, res) => {
    const id = Number(req.params.id);
    const {name} = req.body;

    if (!name) {
        res.status(400).json({success: false, message: "Please provide a name"});

        return;
    }

    const person = people.find((p) => p.id === id);
    if (!person) {
        res.status(404).json({success: false, message: "No person found"});

        return;
    }

    const updatedPeople = people.map((p) => {
        if (p.id === id) {
            p.name = name
        }

        return p;
    });

    res.status(200).json({success: true, message: updatedPeople});
};

const deletePerson = (req, res) => {
    const id = Number(req.params.id);

    const person = people.find((p) => p.id === id);
    if (!person) {
        res.status(404).json({success: false, message: "No person found"});

        return;
    }

    const updatedPeople = people.filter((p) => p.name !== person.name);

    res.status(200).json({success: true, message: updatedPeople});
};

module.exports = {
    getPeople,
    getPerson,
    addPerson,
    updatePerson,
    deletePerson
};
