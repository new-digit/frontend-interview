import { Button } from '@/components/ui/button';
import React from 'react';

interface TableHeaderActionsProps {
  onSearchChange: (value: string) => void;
  onDeleteSelected: () => void;
  onRefresh: () => void;
  selectedCount: number;
}

const TableHeaderActions: React.FC<TableHeaderActionsProps> = ({
  onSearchChange,
  onDeleteSelected,
  onRefresh,
  selectedCount,
}) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4 mb-4">
    <input
      type="text"
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search Invoice"
      className="border border-gray-200 rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
      tabIndex={0}
      aria-label="Search Invoice"
    />
    <Button
      type="button"
      onClick={onDeleteSelected}
      disabled={selectedCount === 0}
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
);

export default TableHeaderActions;
