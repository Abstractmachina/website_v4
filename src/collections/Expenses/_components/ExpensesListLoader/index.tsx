"use client";

import React from "react";

import { ListViewServerProps, Payload } from "payload";
import { Expense, ExpenseTag } from "@/payload-types";

import ExpensesListController from "./ExpensesListController";
import { useConfig } from "@payloadcms/ui";
import { useExpensesQuery } from "@/queries/expensesQueries";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Queryclienttest from "./queryclienttest";

// export const ExpensesListLoader = async (props: ListViewServerProps) => {
// 	const { data, payload, searchParams } = props;
// 	console.log("searchParams", searchParams);
// 	const month : number = searchParams ? Number(searchParams["month"]) : new Date().getMonth();
// 	const year : number = searchParams ? Number(searchParams["year"]) : new Date().getFullYear();

// 	console.log(month, year);
// 	const expenses = await _findByMonth(payload, "expenses", year, month);

// 	const expenseTags = (await payload.find({
// 		collection: "expenseTags",
// 		depth: 0,
// 		where: { },
// 	}))["docs"] as ExpenseTag[];

// 	return (
// 		<>
// 			<div>month: {month}, year: {year}</div>
// 		<ExpensesListController expenses={expenses} expenseTags={expenseTags} />
// 		</>
// 	)
// };
const queryClient = new QueryClient();

export const ExpensesListLoader = (props: ListViewServerProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ExpensesListController />
		</QueryClientProvider>
	);
};

export default ExpensesListLoader;

export async function _findByMonth(
	payload: Payload,
	collection: string,
	year: number,
	month: number,
): Promise<Expense[] | undefined> {
	if (Number.isNaN(year) || Number.isNaN(month)) return undefined;

	const startISO = new Date(year, month, 1).toISOString();
	const endISO = new Date(year, month + 1, 0).toISOString();
	const range = { greater_than_equal: startISO, less_than_equal: endISO };

	const result = await payload.find({
		collection,
		where: { date: range },
		sort: `-date`,
		pagination: false,
		depth: 2,
	});

	return result["docs"] as Expense[];
}
