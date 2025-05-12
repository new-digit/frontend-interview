import React, { useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { Button } from '@/components/ui/button';

interface TableHeaderActionsProps {
  onSearchChange: (value: string) => void;
  onDeleteSelected: () => void;
  onRefresh: () => void;
  selectedCount: number;
  search: string;
}

const TableHeaderActions: React.FC<TableHeaderActionsProps> = ({
  onSearchChange,
  onDeleteSelected,
  onRefresh,
  selectedCount,
  search,
}) => {
  // 用 useMemo 確保 debounce 只建立一次
  const debouncedSearch = useMemo(() => debounce(onSearchChange, 300), [onSearchChange]);

  // 清理 debounce（避免 memory leak）
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4 mb-4">
      <input
        type="text"
        defaultValue={search}
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder="Search Invoice"
        className="border border-gray-200 rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
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
};

export default TableHeaderActions;
