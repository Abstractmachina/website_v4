// import { Gutter } from 'payload/components/elements'
// import React, { useEffect, useState } from 'react';
// import { Search } from 'lucide-react';
// import payload from 'payload';
// import { Expense } from 'payload/generated-types';

import { ListViewServerProps } from 'payload'
import React from 'react'
import ExpensesListTable from './ExpensesListTable'
import { Gutter } from '@payloadcms/ui'
import { Expense } from '@/payload-types'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Centered from '@/components/ui/center-card'

function orderExpensesByDay(input: Expense[]) {
  const output = new Map<string, Expense[]>()

  for (let i = 0; i < input.length; i++) {
    const expense = input[i]
    if (!expense) continue
    const current = output.get(expense.date)
    if (current) {
      output.set(expense.date, [...current, expense])
    } else {
      output.set(expense.date, [expense])
    }
  }

  return output
}

export function ExpensesListViewController(props: ListViewServerProps) {
  // console.log(props)

  const orderedExpenses = orderExpensesByDay(props.data.docs)

  return (
    <Gutter>
      <Centered>

      <ExpensesListTable expenses={orderedExpenses} />
      <Button asChild>
        <Link href="expenses/create">
          <Plus />
        </Link>
      </Button>
      </Centered>
    </Gutter>
  )
}

// function ExpensesList() {
//   // const params = useSearchParams();

//   // const [search, setSearch] = useState(typeof params?.search === 'string' ? params?.search : '')
//   // const [isLoading, setIsLoading] = useState(true);
//   // const [data, setData] = useState<Expense[] | null>(null);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await fetch('/api/expenses', {
//   //         method: 'GET',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         },
//   //       });

//   //       if (!response.ok) {
//   //         throw new Error(`Error: ${response.statusText}`);
//   //       }

//   //       const result = await response.json();
//   //       console.log(result)
//   //       setData(result.docs); // Payload CMS returns data under `docs`
//   //       setIsLoading(false);
//   //     } catch (error) {

//   //     }
//   //   }
//   //   fetchData();
//   // }, []);

//   // if (isLoading) {
//   //   return <p>Loading...</p>;
//   // }

//   return (
//     <>
//       {/* <Gutter> */}
//         <h1>Expenses</h1>
//         <div className="relative ">
//           <input
//             // className={`${}__input`}
//             // onChange={(e) => setSearch(e.target.value)}
//             placeholder={"placeholder.current"}
//             type="text"
//             // value={search || ''}
//           />
//           <Search className='absolute top-1/2 -translate-y-1/2 left-2'/>
//         </div>
//         {/* {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <table>
//             {data?.map((expense) => (
//               <li key={expense.id}>
//                 <p>{expense.amount}</p>
//               </li>
//             ))}
//           </table>
//         )} */}

//       {/* </Gutter> */}
//     </>
//   )
// }

export default ExpensesListViewController
