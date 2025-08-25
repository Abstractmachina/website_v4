"use client";

import React from "react";

import { Expense, ExpenseTag } from "@/payload-types";
import Centered from "@/components/ui/Centered";
import { formatDateTime2 } from "@/utilities/formatDateTime";

type Props = {
	expenses: Map<string, Expense[]>;
};

const ExpensesListTable = ({ expenses }: Props) => {
	return (
		<Centered>
			{Array.from(expenses).map(([key, val]) => {
				const total = _getTotal(val.map((doc: Expense) => doc.amount || 0));
				return (
					<table key={key} className="w-full border-collapse mb-4">
						<thead>
							<tr className="px-2">
								<th className="text-left pl-2">{formatDateTime2(key)}</th>
								<th className="text-right pr-2">{_formatCurrency(total)}</th>
							</tr>
						</thead>
						<tbody className="bg-zinc-800">
							{val.map((doc: Expense, index: number) => (
								<tr key={key + "_" + index}>
									<td className="pl-2">
										<span className="font-bold">{doc.category}</span>
										<span>{" "} {(doc.tag as ExpenseTag)?.name}</span>
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
		</Centered>
	);
};

export default ExpensesListTable;

function _getTotal(vals: number[]): number {
	return vals.reduce((accumulator, currentVal) => accumulator + currentVal, 0);
}

function _formatCurrency(val: number): string {
	return (Math.round(val * 100) / 100).toFixed(2);
}
