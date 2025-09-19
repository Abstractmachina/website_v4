"use client";

import React from "react";

import { ListViewServerProps } from "payload";

import ExpensesListController from "./ExpensesListController";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const ExpensesListLoader = (props: ListViewServerProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ExpensesListController />
		</QueryClientProvider>
	);
};

export default ExpensesListLoader;

