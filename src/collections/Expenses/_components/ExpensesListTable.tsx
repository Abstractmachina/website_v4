"use client";

import React, { useEffect, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Expense } from '@/payload-types';

/***
 * interface Expense {
   id: string;
   amount?: number | null;
   category?:
     | ('food' | 'shelter' | 'transport' | 'health' | 'Fitness' | 'education' | 'business' | 'wife' | 'non-essential')
     | null;
   tags?: (string | null) | ExpenseTag;
   comment?: string | null;
   date?: string | null;
   updatedAt: string;
   createdAt: string;
 }
 */

const defaultData: Expense[] = [
  {
    id: '1',
    amount: 100,
    updatedAt: '?',
    createdAt: '?',
  },
  {
    id: '2',
    amount: 100,
    updatedAt: '?',
    createdAt: '?',
  },
]

const columnHelper = createColumnHelper<Expense>()

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('tags', {
    header: 'Tags',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('comment', {
    header: 'Comment',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Updated At',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
]


type Props = {
  docs?: Expense[];
}

const ExpensesListTable = ({docs}: Props) => {
  
  const [data, _setData] = useState<Expense[]>([...defaultData]);

  useEffect(() => {
    if (docs) _setData(docs);
  }, [docs]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.footer, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
        <div className="h-4" />
        <button
          // onClick={() => rerender()}
          className="border p-2"
        >
          Rerender
        </button>
      </div>
  )
}

export default ExpensesListTable;