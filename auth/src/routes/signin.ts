import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req,res) => {
    res.send('Sign up!');
})

router.get('/api/users/signin', (req,res) => {
    res.send('Getting sign in');
})

export {router as signinRouter};