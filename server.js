const express = require('express');
const { connection } = require('./config/db');
const { userRouter } = require('./route/userRoute');
const { postRouter } = require('./route/postRoute');

require('dotenv').config();
const app = express();
app.use(express.json());

const PORT = process.env.port || 8080;


app.get('/', (req, res) => {
    res.status(200).send({ msg: 'Welcome to Social Media App.' });
});

app.use('/api', userRouter)
app.use('/api', postRouter)


app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Something error with connecting DB");
    }
    console.log(`Server is running at http://localhost:${PORT}`);
});


