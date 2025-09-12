import React from "react";

import { ListViewServerProps, Payload } from "payload";
import { Expense, ExpenseTag } from "@/payload-types";

import ExpensesListController from "./ExpensesListController";

export const ExpensesListLoader = async (props: ListViewServerProps) => {
	const { data, payload, searchParams } = props;
	const month : number = searchParams ? Number(searchParams["month"]) : new Date().getMonth();
	const year : number = searchParams ? Number(searchParams["year"]) : new Date().getFullYear();


	const expenses = (month >= 0 && year >= 0) ? (await _findByMonth(payload, "expenses", year, month))["docs"] as Expense[] : [];

	const expenseTags = (await payload.find({
		collection: "expenseTags",
		depth: 0,
		where: { },
	}))["docs"] as ExpenseTag[];

	return <ExpensesListController expenses={expenses} expenseTags={expenseTags} />
};

export default ExpensesListLoader;


export async function _findByMonth(
	payload: Payload,
	collection: string,
	year: number,
	month: number,
) {
	const startISO = new Date(year, month, 1).toISOString();
	const endISO = new Date(year, month+1, 0).toISOString();
	const range = { greater_than_equal: startISO, less_than_equal: endISO }

	return payload.find({
		collection,
		where: { "date": range },
		sort: `-date`,
		pagination: false,
		depth: 2,
	});
}
