const express = require('express');

const router = express.Router();

// getting place by id
router.get('/:pid', (
    req
    , res
    , next
) => {
    if (!req.params.pid){
        res.status(404).json({msg: "No Matched Place !!!"})
    }
    res.status(200).json({msg: "it is json response for getting place by id !!!" + req.params.pid})
});


// getting place by user id
router.get('/user/:uid', (
    req
    , res
    , next
) => {
    res.json({msg: "it is json response for getting place by user id !!!" + req.params.uid})
})

module.exports = router;