import { CashflowType } from '@prisma/client';
import { ObjectId } from 'mongodb';

export type User = {
	email: string;
	name: string;
	password: string;
};

export type Session = {
	token: string;
	date: Date;
	userId: ObjectId;
};

export type Cashflow = {
	title: string;
	price: Number;
	type: CashflowType;
	ownerId: ObjectId;
};
