const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Hello, World!'));
router.get('/about', (req, res) => res.send('About page'));
router.post('/contact', (req, res) => res.send('Contact page'));
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`You passed the id: ${id}`);
});

module.exports = router;
