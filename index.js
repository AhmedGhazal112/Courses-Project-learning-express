require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const coursesRouter = require("./routes/courses.route");
const userRouter = require('./routes/user.route');
const verify  = require('./middlewares/verify');

app.use(express.json());
app.use(cors());

const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
    console.log("DB Connected Successfully");
}).catch((err) => {
    console.error(`DB Connection Error: ${err.message}`);
    process.exit(1);
});

app.use('/api/courses', verify, coursesRouter);
app.use('/api/users', userRouter);
app.use((req, res) => {
    res.status(404).send("Route not found");
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        console.error(`Error after headers sent: ${error.message}`);
        return;
    }
    console.error(`500 - ${error.message}`);
    return res.status(500).json({ error: error.message });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`)
}
);