import { CashflowType } from '@prisma/client';

export type User = {
	email: string;
	name: string;
	password: string;
};

export type Session = {
	token: string;
	userId: string;
};

export type Cashflow = {
	title: string;
	price: number;
	type: CashflowType;
	ownerId: string;
};
