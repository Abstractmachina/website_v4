import { useExpensesQuery } from "@/queries/expensesQueries";
import { useConfig } from "@payloadcms/ui";
import React, { useState } from "react";
import ControlPanel from "./ControlPanel";

type Props = {};

const Queryclienttest = (props: Props) => {
  
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth(),
	);
	const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
	);
	const [selectedTab, setSelectedTab] = useState<string>("date");
	// const [loading, setLoading] = useState(expenses ? false : true);
  const query = useExpensesQuery(
    selectedYear || new Date().getFullYear(),
    selectedMonth || new Date().getMonth(),
  );
  const config = useConfig();

  
	return (
    <div>
			<ControlPanel
				selectedMonth={selectedMonth}
				setSelectedMonth={setSelectedMonth}
				selectedYear={selectedYear}
				setSelectedYear={setSelectedYear}
        />
        {(query.isLoading) && <div>Loading...</div>}
        {(query.isError) && <div>Error: {JSON.stringify(query.error)}</div>}
			{query.data
				? query.data.map((expense) => (
						<div key={expense.id}>
							<p>
								{expense.amount} - {expense.date} - {expense.category}
							</p>
						</div>
					))
				: "No expenses found"}
		</div>
	);
};

export default Queryclienttest;
