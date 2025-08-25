// import { Gutter } from 'payload/components/elements'
// import React, { useEffect, useState } from 'react';
// import { Search } from 'lucide-react';
// import payload from 'payload';
// import { Expense } from 'payload/generated-types';

import { DocumentTabServerProps, ListViewServerProps } from "payload";
import React from "react";
import ExpensesListTable from "./ExpensesListTable";
import { Gutter } from "@payloadcms/ui";
import { Expense } from "@/payload-types";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Centered from "@/components/ui/Centered";
import { fetchExpenseTag } from "@/lib/serverFetchers/expenseTagFetchers";
import PlusButton from "./PlusButton";
import CenteredOverlay from "./CenteredOverlay";
import H1 from "@/components/styledComponents/H1";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomTabComponentClient } from "./CustomTab";

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

		const current = output.get(expense.date);
		if (current) {
			output.set(expense.date, [...current, expense]);
		} else {
			output.set(expense.date, [expense]);
		}
	}

	return output;
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
						<TabsTrigger value="account">Account</TabsTrigger>
						<TabsTrigger value="password">Password</TabsTrigger>
					</TabsList>
					<TabsContent value="account">
						Make changes to your account here.
					</TabsContent>
					<TabsContent value="password">Change your password here.</TabsContent>
				</Tabs>
				<ExpensesListTable expenses={orderedExpenses} />
			</Centered>
			<CenteredOverlay>
				<PlusButton
					href="expenses/create"
					className="bottom-8 left-8 bg-red-100"
				/>
			</CenteredOverlay>
		</Gutter>
	);
};


export default ExpensesListViewController;


type CustomTabComponentProps = {
  label: string
} & DocumentTabServerProps

export function CustomTabComponent(props: CustomTabComponentProps) {
  const { label, path } = props

  return (
    <li className="custom-doc-tab">
      <CustomTabComponentClient label={label} path={path} />
    </li>
  )
}