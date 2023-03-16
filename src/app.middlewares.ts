import express from 'express';
import cors from 'cors';
import { authRouter, entryRouter, userRouter } from './routes/index.js';

const middlewares = [
	express.json(),
	cors(),
	authRouter,
	entryRouter,
	userRouter,
];

export default middlewares;
