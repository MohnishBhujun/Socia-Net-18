const router = require('express').Router();
const{
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createRaction,
    deleteRaction
    
}= require('../../controllers/thought.controller');

router.route('/').get(getAllThoughts).post(createThought)
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(createRaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteRaction);

module.exports = router;