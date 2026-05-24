import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
 
import { contactMessageService } from './data/api';
import type { ContactMessage } from './data/schema';

 

const columnHelper = createColumnHelper<ContactMessage>();

const columns = [
  columnHelper.accessor('name', { header: 'Name', cell: info => info.getValue() }),
  columnHelper.accessor('email', { header: 'Email', cell: info => info.getValue() }),
  columnHelper.accessor('subject', { header: 'Subject', cell: info => info.getValue() }),
  columnHelper.accessor('message', { header: 'Message', cell: info => info.getValue() }),
  columnHelper.accessor('readAt', { header: 'Date', cell: info => info.getValue() }),
  columnHelper.accessor('createdAt', { header: 'Date', cell: info => info.getValue() }),
];

export const AdminDashboard: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: () => contactMessageService.getMessages({per_page: 10}),
  });

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading messages</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>
      <table className="w-full text-left border-collapse border border-slate-200">
        <thead className="bg-slate-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="p-4 border-b">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b hover:bg-slate-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
