const Express = require("express");
const router = Express.Router();

router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route!')
});

router.get('/about', (req, res) => {
    res.send('This is the about route, but I will not use an exclamation point because that seems excessive.')
});

module.exports = router;