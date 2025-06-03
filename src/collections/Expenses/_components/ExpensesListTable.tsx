"use client";

import React from 'react'

import { Expense } from '@/payload-types';
import { Plus } from 'lucide-react';
import dateformat from "dateformat";
import { Gutter } from '@payloadcms/ui';
import Centered from '@/components/ui/center-card';
import { formatDateTime2 } from '@/utilities/formatDateTime';
import {useQueries} from '@tanstack/react-query';


type Props = {
  expenses: Map<string,Expense[]>;
}

const ExpensesListTable = ({expenses}: Props) => {
  
  console.log(expenses);
  // const tagsQuery = useQueries({
  //   queries: Array.from(expenses).map(([key, val]) => {
      
  //   })
  // })

  return (
      
    <Centered>
      {
        Array.from(expenses).map(([key, val]) => {
          return (
            <table key={key} className='w-full '>
              <thead>
                <tr>
                  <th>
                    { formatDateTime2(key)}
                  </th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className='bg-zinc-800'>
                {val.map((doc: Expense, index: number) => (
                  <tr key={key+ "_" + index}>
                    <td>{doc.category}{ doc.tag?.toString() }</td>
                    <td>{doc.amount}</td>
                  </tr>))}
              </tbody>
              <tfoot>

              </tfoot>
            </table>
        )})
      }
    </Centered>
  )
}

export default ExpensesListTable;