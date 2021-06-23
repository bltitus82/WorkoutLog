const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const workoutLog = require("../models/log");

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!')
});

// New Log
router.post("/create", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.workoutLog; 
    const id = req.user.id;
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newWorkout = await workoutLog.create(logEntry);
        res.status(200).json(newWorkout)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Logs

router.get('/', async (req, res) => {
    try {
        const entries = await workoutLog.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Logs by User ID

router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userLogs = await workoutLog.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a Workout Log Entry

router.put("/:id", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.workoutLog;
    const logId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: logId,
            owner_id: userId
        }
    };

    const updatedLog = {
        description: description,
        definition: definition,
        result: result
    };

    try {
        const update = await workoutLog.update(updatedLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a Workout Log Entry

router.delete("/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const workoutId = req.params.id;

    try {
        const query = {
            where: {
                id: workoutId,
                owner_id: ownerId
            }
        };

        await workoutLog.destroy(query);
        res.status(200).json({ message: "Workout log removed" });
    } catch (err) {
        res.status(500).json({error: err.message });
    }
});

module.exports = router;