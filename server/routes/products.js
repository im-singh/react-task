const router = require("express").Router();
const axios = require("axios");


router.get("/", (req, res) => {
    axios.get("http://jsonplaceholder.typicode.com/posts")
        .then(r => {
            res.json(r.data);
        })
        .catch(err => {
            res.status(500).json("server error");
        })
});

module.exports = router;