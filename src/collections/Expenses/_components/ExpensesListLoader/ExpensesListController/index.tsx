"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Expense, ExpenseTag } from "@/payload-types";

import Centered from "@/components/ui/Centered";
import CenteredOverlay from "../../CenteredOverlay";
import ControlPanel from "../ControlPanel";
import ExpensesListTable from "../../ExpensesListTable";
import { Gutter } from "@payloadcms/ui";
import H1 from "@/components/styledComponents/H1";
import PlusButton from "../../PlusButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDateTime, isEqualToformattedDates } from "@/utilities/formatDateTime";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
	expenses: Expense[];
	expenseTags: ExpenseTag[];
};

const ExpensesListController = ({ expenses, expenseTags }: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();


	const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
	const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		__updateQueryString();
	}, [selectedMonth, selectedYear]);

	const sortedExpenses =useMemo(() => {
		const results = __orderExpensesByDay(expenses, expenseTags);
		setLoading(false);
		return results;
	}, [expenses, expenseTags]);

	function __updateQueryString() {
		const params = new URLSearchParams(searchParams.toString());
		params.set('month', selectedMonth.toString());
		params.set('year', selectedYear.toString());
		params.forEach((value, key) => {
			console.log(key, value);
		})
		router.push(pathname + '?' + params.toString());
	}

	return (
		<>
			<Centered className="relative h-full">
				<H1 className="mb-8">Expenses</H1>

				<Tabs defaultValue="account" className="">
					<TabsList>
						<TabsTrigger value="date">By Date</TabsTrigger>
						<TabsTrigger value="category">By Category</TabsTrigger>
						<TabsTrigger value="analysis">Analysis</TabsTrigger>
					</TabsList>
					<TabsContent value="date">
						<ControlPanel
							selectedMonth={selectedMonth}
							setSelectedMonth={setSelectedMonth}
							selectedYear={selectedYear}
							setSelectedYear={setSelectedYear}
						/>
						{loading ? <span>... Loading ...</span> :
							<ExpensesListTable expenses={sortedExpenses} />
						}
					</TabsContent>
					<TabsContent value="category">Change your password here.</TabsContent>
					<TabsContent value="analysis">Change your password here!!!!!!!!!!!!.</TabsContent>
				</Tabs>
			</Centered>
			<CenteredOverlay>
				<PlusButton
					href="expenses/create"
					className="bottom-8 left-8 bg-red-500 pointer-events-auto"
				/>
			</CenteredOverlay>
		</>
	);
};

export default ExpensesListController;

function __orderExpensesByDay(input: Expense[], tags: ExpenseTag[]) {
  const output = new Map<string, Expense[]>();

  for (let i = 0; i < input.length; i++) {
    let expense = input[i];
    if (!expense) continue;

    if (typeof expense.tag === "string") {
      // fetch full document.
      // const fullTag = await fetchExpenseTag(expense.tag);
			const fullTag = tags.find((tag) => tag.id === expense?.tag);
			if (fullTag) expense = { ...expense, tag: fullTag };
    }
    // this compares the date as a string.
    // // so wont necessarily match the same day.
    const current = __getExpensesByDate(output, expense.date);
    if (current) {
      output.set(formatDateTime(expense.date), [...current, expense]);
    } else {
      output.set(formatDateTime(expense.date), [expense]);
    }
  }

  return output;
}

function __getExpensesByDate(
  map: Map<string, Expense[]>,
  date: string,
): Expense[] | undefined {
  for (const k of map.keys()) {
    const equal = isEqualToformattedDates(date, k);
    if (equal) return map.get(k);
  }
}