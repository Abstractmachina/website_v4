import { Expense } from "@/payload-types";

export type Categories = Extract<NonNullable<Expense['category']>, {}>;