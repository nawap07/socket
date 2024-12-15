import express from "express"

const port = 3000;
const app = express();
app.get("/", (req, res) => {
    res.send("Good evening pawan ")
})

app.listen(port, () => {
    console.log(`Server is started at port : http://localhost:${port}`);
})