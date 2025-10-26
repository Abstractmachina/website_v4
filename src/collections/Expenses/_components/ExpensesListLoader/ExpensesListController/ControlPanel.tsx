import React from "react";
import MonthPicker from "./ControlPanel";

type Props = {
	selectedMonth: number;
	setSelectedMonth: (month: number) => void;
	selectedYear: number;
	setSelectedYear: (year: number) => void;
};

const ControlPanel = ({
	selectedMonth,
	setSelectedMonth,
	selectedYear,
	setSelectedYear,
}: Props) => {
	return (
		<div className="flex justify-center py-4">
			<MonthPicker
				selectedMonth={selectedMonth}
				setSelectedMonth={setSelectedMonth}
				selectedYear={selectedYear}
				setSelectedYear={setSelectedYear}
			/>
		</div>
	);
};

export default ControlPanel;
