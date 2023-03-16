import { prisma } from '../app';
import { Cashflow } from '../models/types.model';

export async function create(cashflow: Cashflow) {
	return await prisma.cashflows.create({
		data: cashflow,
	});
}
