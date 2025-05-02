"use client";

import { useState } from "react";
import { useInvoiceQuery } from "@/hooks/useInvoiceQuery";
import { useInvoiceActions } from "@/hooks/useInvoiceActions";
import InvoiceTable from "@/components/InvoiceTable";
import TableToolbar from "@/components/TableToolbar";

export const pageSize = 9;
export default function Home() {
  const [page, setPage] = useState(1);
  const { data, total, loading, refetch, setData } = useInvoiceQuery(
    page,
    pageSize
  );
  const {
    toggledIds,
    searchInput,
    setSearchInput,
    filteredData,
    selectedIds,
    handleToggle,
    handleToggleAll,
    handleDeleteSelected,
    resetSelection,
    toggleBalanceDisplay
  } = useInvoiceActions(data, setData);

  const handleRefresh = async () => {
    await refetch();
    resetSelection();
    setSearchInput("");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className=" bg-white rounded-xl shadow p-6">
        <TableToolbar
          onRefresh={handleRefresh}
          onDelete={handleDeleteSelected}
          search={searchInput}
          onSearchChange={(e) => setSearchInput(e.target.value)}
        />
        <InvoiceTable
          data={filteredData}
          loading={loading}
          page={page}
          pageSize={pageSize}
          total={total}
          selectedIds={selectedIds}
          toggledIds={toggledIds}
          onToggle={handleToggle}
          onToggleAll={handleToggleAll}
          onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
          onNextPage={() => setPage((p) => p + 1)}
          toggleBalanceDisplay={toggleBalanceDisplay}
        />
      </div>
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <p>
          © 2022, Made by <span className="text-purple-500">ABC</span>
        </p>
        <div className="space-x-4 text-purple-500">
          <a href="#">License</a>
          <a href="#">More Themes</a>
          <a href="#">Documentation</a>
          <a href="#">Support</a>
        </div>
      </div>
    </main>
  );
}
