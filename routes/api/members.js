const express = require('express');
const router = express.Router();

const members = require('../../Members');

// Get all members:
router.get('/', (req, res) => {
    res.json(members); 
});
//Get a single member:
router.get('/:id', (req, res) => {
    const memberExists = members.some(member => member.id === parseInt(req.params.id));

    if (memberExists) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `The member with the id of ${req.params.id} does not exist` });
    }
});

// Create member:
router.post('/', (req, res) => {
    const newMember = {
        id: Math.floor(Math.random() * 10000),
        name: req.body.name,
        email: req.body.email,
        status: 'alive',
    };

    if (!newMember.email || !newMember.name) {
        return res.status(400).json({ msg: 'Please fill in the name and email' });
    }

    members.push(newMember);
    //res.json(members);
    res.redirect('/');
});

// Update member:
router.put('/:id', (req, res) => {
    const memberExists = members.some(member => member.id === parseInt(req.params.id));

    if (memberExists) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;

                res.json({ msg: 'Member updated', member });
            }
        });
    } else {
        res.status(400).json({ msg: `The member with the id of ${req.params.id} does not exist` });
    }
});

// Delete member:
router.delete('/:id', (req, res) => {
    const memberExists = members.some(member => member.id === parseInt(req.params.id));

    if (memberExists) {
        res.json({ 
            msg: 'Member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id)) 
        });
    } else {
        res.status(400).json({ msg: `The member with the id of ${req.params.id} does not exist` });
    }
});

module.exports = router;