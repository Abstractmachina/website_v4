import { ListViewServerProps } from "payload";

import {
	formatDateTime,
	isEqualToformattedDates,
} from "@/utilities/formatDateTime";

import React from "react";

import Centered from "@/components/ui/Centered";
import CenteredOverlay from "./CenteredOverlay";
import ExpensesListTable from "./ExpensesListTable";
import { Expense } from "@/payload-types";
import { fetchExpenseTag } from "@/lib/serverFetchers/expenseTagFetchers";
import H1 from "@/components/styledComponents/H1";
import { Gutter } from "@payloadcms/ui";
import PlusButton from "./PlusButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function orderExpensesByDay(input: Expense[]) {
	const output = new Map<string, Expense[]>();

	for (let i = 0; i < input.length; i++) {
		let expense = input[i];
		if (!expense) continue;

		if (typeof expense.tag === "string") {
			// fetch full document.
			const fullTag = await fetchExpenseTag(expense.tag);
			expense = { ...expense, tag: fullTag };
		}
		// this compares the date as a string.
		// // so wont necessarily match the same day.
		const current = getExpensesByDate(output, expense.date);
		if (current) {
			output.set(formatDateTime(expense.date), [...current, expense]);
		} else {
			output.set(formatDateTime(expense.date), [expense]);
		}
	}

	return output;
}

function getExpensesByDate(
	map: Map<string, Expense[]>,
	date: string,
): Expense[] | undefined {
	for (const k of map.keys()) {
		const equal = isEqualToformattedDates(date, k);
		if (equal) return map.get(k);
	}
}

export const ExpensesListViewController = async (
	props: ListViewServerProps,
) => {
	const orderedExpenses = await orderExpensesByDay(props.data.docs);

	return (
		<Gutter>
			<Centered className="relative h-full">
				<H1 className="mb-8">Expenses</H1>

				<Tabs defaultValue="account" className="w-[800px]">
					<TabsList>
						<TabsTrigger value="account">By Date</TabsTrigger>
						<TabsTrigger value="password">By Category</TabsTrigger>
					</TabsList>
					<TabsContent value="account">
						<ExpensesListTable expenses={orderedExpenses} />
					</TabsContent>
					<TabsContent value="password">Change your password here.</TabsContent>
				</Tabs>
			</Centered>
			<CenteredOverlay>
				<PlusButton
					href="expenses/create"
					className="bottom-8 left-8 bg-red-100 pointer-events-auto"
				/>
			</CenteredOverlay>
		</Gutter>
	);
};

export default ExpensesListViewController;