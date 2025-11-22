"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { useUpdateExpensesMutation } from "@/lib/mutations/expenseMutations";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CATEGORIES = [
	"taxes",
	"personalRecurring",
	"personalOneOff",
	"investments",
	"business",
	"food",
	"shelter",
	"transport",
	"health",
	"fitness",
	"education",
	"wife",
	"non-essential",
] as const;

type Props = {};

const ChangeCategoryForm = (props: Props) => {
	const [sourceType, setSourceType] = useState<"category" | "tag">("category");
	const [sourceCategory, setSourceCategory] = useState("");
	const [targetCategory, setTargetCategory] = useState("");

	const mutation = useUpdateExpensesMutation();

	async function handleOnClick() {
		mutation.mutate({
			where: { "tag.name": { equals: "Social Security" } },
			data: { category: "taxes" },
		});
	}
	return (
		<div className="flex flex-col gap-4">
			<RadioGroup defaultValue="category" className="flex">
				<div className="flex items-center gap-3">
					<RadioGroupItem value="default" id="r1" />
					<Label htmlFor="r1">Category</Label>
				</div>
				<div className="flex items-center gap-3">
					<RadioGroupItem value="default" id="r1" />
					<Label htmlFor="r1">Tag</Label>
				</div>
			</RadioGroup>
			<div>
				<Label>Source Category</Label>
				<Select
					onValueChange={(value: string) => {
						setSourceCategory(value);
					}}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a category" />
					</SelectTrigger>
					<SelectContent>
						{/* <SelectGroup> */}
						{/* <SelectLabel>Fruits</SelectLabel> */}
						{CATEGORIES.map((category) => (
							<SelectItem key={category} value={category}>
								{category}
							</SelectItem>
						))}
						{/* <SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="blueberry">Blueberry</SelectItem>
						<SelectItem value="grapes">Grapes</SelectItem>
						<SelectItem value="pineapple">Pineapple</SelectItem> */}
						{/* </SelectGroup> */}
					</SelectContent>
				</Select>
			</div>
			<div>
				<Label>Target Category</Label>
				<Select
					onValueChange={(value: string) => {
						setTargetCategory(value);
					}}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a category" />
					</SelectTrigger>
					<SelectContent>
						{/* <SelectGroup> */}
						{/* <SelectLabel>Fruits</SelectLabel> */}
						{CATEGORIES.map((category) => (
							<SelectItem key={category} value={category}>
								{category}
							</SelectItem>
						))}
						{/* <SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="blueberry">Blueberry</SelectItem>
						<SelectItem value="grapes">Grapes</SelectItem>
						<SelectItem value="pineapple">Pineapple</SelectItem> */}
						{/* </SelectGroup> */}
					</SelectContent>
				</Select>
			</div>
			<Button onClick={handleOnClick}>
				{mutation.isPending ? "Processing..." : "Process"}
			</Button>
		</div>
	);
};

export default ChangeCategoryForm;
