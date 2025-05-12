'use client';
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '../../components/ui/table';
import Skeleton from '../../components/ui/Skeleton';
import { AccountData } from '../api/mock';
import InvoiceTableRow from './InvoiceTableRow';

type InvoiceTableProps = {
  invoices: AccountData[];
  selectedIds: number[];
  onSelectAll: () => void;
  onSelectRow: (id: number) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
};

const InvoiceTableSkeletonRow = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="w-4 h-4" />
    </TableCell>
    <TableCell>
      <Skeleton className="w-16 h-4" />
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-full" />
        <div>
          <Skeleton className="w-24 h-4 mb-1" />
          <Skeleton className="w-20 h-3" />
        </div>
      </div>
    </TableCell>
    <TableCell>
      <Skeleton className="w-14 h-4" />
    </TableCell>
    <TableCell>
      <Skeleton className="w-20 h-4" />
    </TableCell>
    <TableCell>
      <Skeleton className="w-12 h-5 rounded-full" />
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-3">
        <Skeleton className="w-7 h-7 rounded-full" />
        <Skeleton className="w-7 h-7 rounded-full" />
        <Skeleton className="w-7 h-7 rounded-full" />
      </div>
    </TableCell>
  </TableRow>
);

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  selectedIds,
  onSelectAll,
  onSelectRow,
  onDelete,
  isLoading = false,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead className="pl-6 flex items-center" isShowSeparator={false}>
            {!isLoading && (
              <input
                type="checkbox"
                checked={selectedIds.length === invoices.length && invoices.length > 0}
                onChange={onSelectAll}
                aria-label="Select All"
                tabIndex={0}
                className="accent-primary w-4 h-4"
              />
            )}
          </TableHead>
          <TableHead>ID</TableHead>
          <TableHead>CLIENT</TableHead>
          <TableHead>TOTAL</TableHead>
          <TableHead>ISSUED DATE</TableHead>
          <TableHead>BALANCE</TableHead>
          <TableHead>ACTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => <InvoiceTableSkeletonRow key={idx} />)
          : invoices.map((invoice) => (
              <InvoiceTableRow
                key={invoice.id}
                invoice={invoice}
                selected={selectedIds.includes(invoice.id)}
                onSelectRow={onSelectRow}
                onDelete={onDelete}
              />
            ))}
      </TableBody>
    </Table>
  );
};

export default InvoiceTable;
