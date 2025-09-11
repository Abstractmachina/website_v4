"use client";

import React, { useMemo } from "react";

import { Expense, ExpenseTag } from "@/payload-types";
import Centered from "@/components/ui/Centered";
import { formatDateTime } from "@/utilities/formatDateTime";
import Link from "next/link";
import H3 from "@/components/styledComponents/H3";

type Props = {
	expenses: Map<string, Expense[]>;
	sortBy?: "date" | "category";
};

const ExpensesListTable = ({ expenses, sortBy }: Props) => {
	
	const total = useMemo(() => {
		if (!expenses) return 0;
		const result = _getTotal(Array.from(expenses.values()).map((expenseArray) => { const sub = _getTotal(expenseArray.map((doc: Expense) => doc.amount || 0)); return sub; }));
		return result;
	}, [expenses]);

	return (
		<div className="flex flex-col gap-4">
			<div className="w-full bg-zinc-400 bg-opacity-25 p-8 rounded-md flex justify-center">
				<H3>Monthly Total: &euro; { _formatCurrency(total) }</H3>
			</div>
			<table id="expenses_list_table_container" className="w-full">
				{Array.from(expenses).map(([key, val]) => {
					const total = _getTotal(val.map((doc: Expense) => doc.amount || 0));
					return (
						<table key={key} className="w-full border-collapse mb-4">
							<thead>
								<tr className="px-2">
									<th className="text-left pl-2">{key}</th>
									<th className="text-right pr-2">{_formatCurrency(total)}</th>
								</tr>
							</thead>
							<tbody className="bg-zinc-800">
								{val.map((doc: Expense, index: number) => (
									<tr key={key + "_" + index}>
										<td className="pl-2">
											<Link href={`/admin/collections/expenses/${doc.id}`}>
												<span className="font-bold">{doc.category}</span>
												<span> {(doc.tag as ExpenseTag)?.name}</span>
											</Link>
										</td>
										<td className="w-20 text-right pr-2">
											{_formatCurrency(doc.amount || 0)}
										</td>
									</tr>
								))}
							</tbody>
							<tfoot></tfoot>
						</table>
					);
				})}
			</table>
		</div>
	);
};

export default ExpensesListTable;

function _getTotal(vals: number[]): number {
	return vals.reduce((accumulator, currentVal) => accumulator + currentVal, 0);
}

function _formatCurrency(val: number): string {
	return (Math.round(val * 100) / 100).toFixed(2);
}
