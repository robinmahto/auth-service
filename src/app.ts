import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('welcome to the auth service');
});

export default app;