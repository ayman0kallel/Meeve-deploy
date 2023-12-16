import express from 'express';

import {createUser, loginUser } from '../controllers/userController.js';


const router = express.Router();


//router.get('/', getUsers);

// add route
router.post('/', createUser);

// login route
router.post('/login', loginUser);

// user detail route
//router.get('/:id', getUser);

export default router;