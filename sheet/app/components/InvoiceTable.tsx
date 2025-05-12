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
import Image from 'next/image';
import DeleteIcon from '../../components/icons/DeleteIcon';
import ViewIcon from '../../components/icons/ViewIcon';
import MoreIcon from '../../components/icons/MoreIcon';
import IconButton from '../../components/ui/IconButton';
import Skeleton from '../../components/ui/Skeleton';
import { AccountData } from '../api/mock';
import { Button } from '@/components/ui/button';

type InvoiceTableProps = {
  invoices: AccountData[];
  selectedIds: number[];
  search: string;
  onSearchChange: (value: string) => void;
  onSelectAll: () => void;
  onSelectRow: (id: number) => void;
  onDeleteSelected: () => void;
  onRefresh: () => void;
  isLoading?: boolean;
};

const getAvatar = (id: number) => `/avatars/0${(id % 7) + 1}.png`;

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
  search,
  onSearchChange,
  onSelectAll,
  onSelectRow,
  onDeleteSelected,
  onRefresh,
  isLoading = false,
}) => {
  // 狀態標籤
  const renderStatus = (hasPaid: boolean) => {
    if (hasPaid)
      return (
        <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-medium">
          Paid
        </span>
      );
    return (
      <span className="bg-red-200 text-red-700 rounded-full px-3 py-1 text-xs font-medium">
        Unpaid
      </span>
    );
  };

  return (
    <>
      {/* Header 操作列 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Invoice"
          className="border border-gray-200 rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Search Invoice"
        />
        <Button
          type="button"
          onClick={onDeleteSelected}
          disabled={selectedIds.length === 0}
          className="bg-red-500 hover:bg-red-600 cursor-pointer"
          aria-label="Delete Selected Invoices"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onDeleteSelected()}
        >
          DELETE
        </Button>
        <Button
          type="button"
          onClick={onRefresh}
          className="bg-purple-500 hover:bg-purple-600 cursor-pointer"
          aria-label="Refresh Invoice"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onRefresh()}
        >
          REFRESH INVOICE
        </Button>
      </div>
      {/* 表格 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input
                type="checkbox"
                checked={selectedIds.length === invoices.length && invoices.length > 0}
                onChange={onSelectAll}
                aria-label="Select All"
                tabIndex={0}
                className="accent-primary w-4 h-4"
              />
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
                <TableRow
                  key={invoice.id}
                  data-state={selectedIds.includes(invoice.id) ? 'selected' : undefined}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(invoice.id)}
                      onChange={() => onSelectRow(invoice.id)}
                      aria-label={`Select invoice ${invoice.id}`}
                      tabIndex={0}
                      className="accent-primary w-4 h-4"
                    />
                  </TableCell>
                  <TableCell>
                    <a
                      href={`#${invoice.id}`}
                      className="text-blue-500 underline hover:text-blue-700 focus:outline-none"
                      tabIndex={0}
                      aria-label={`View invoice ${invoice.id}`}
                    >
                      #{invoice.id}
                    </a>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={getAvatar(invoice.id)}
                        alt={invoice.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full border"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{invoice.name}</div>
                        <div className="text-xs text-gray-500">{invoice.mail}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{`$${invoice.totalBalance.toLocaleString()}`}</TableCell>
                  <TableCell>{new Date(invoice.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{renderStatus(invoice.hasPaid)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <IconButton
                        aria-label="Delete Invoice"
                        tabIndex={0}
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="View Invoice"
                        tabIndex={0}
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton
                        aria-label="More Actions"
                        tabIndex={0}
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <MoreIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
};

export default InvoiceTable;
