const app = require("./app.js")

let port = 8000;

app.listen(port, () => {
    console.log("server is online on:" + port);
});
