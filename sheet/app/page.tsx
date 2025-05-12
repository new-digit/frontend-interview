'use client';
import React, { useEffect, useState } from 'react';
import InvoiceTable from './components/InvoiceTable';
import { useFetchAccountData } from './hooks/useFetchAccountData';
import Pagination from '@/components/ui/Pagination';
import { filterAccountData } from './utils/filterAccountData';
import TableHeaderActions from './components/TableHeaderActions';

const PAGE_SIZE = 10;

const Page = () => {
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const getAccountData = useFetchAccountData();

  useEffect(() => {
    getAccountData.fetchData({ page: 1, pageSize: PAGE_SIZE });
  }, []);

  const Invoices = getAccountData.data?.data ?? [];

  // 全選
  const handleSelectAll = () => {
    if (selectedIds.length === Invoices.length) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(Invoices?.map((i) => i.id) || []);
  };

  // 單選
  const handleSelectRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  // 刪除
  const handleDeleteSelected = () => {
    setSelectedIds([]);
  };

  // 刷新
  const handleRefresh = () => {
    getAccountData.fetchData({ page: 1, pageSize: PAGE_SIZE });
    setSelectedIds([]);
    setSearch('');
  };

  // 搜尋
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setSelectedIds([]);
    getAccountData.fetchData({ page: 1, pageSize: PAGE_SIZE, search: value });
  };

  // 換頁
  const handlePageChange = (page: number) => {
    getAccountData.fetchData({ page, pageSize: PAGE_SIZE });
  };

  return (
    <main className="m-8">
      <div className="bg-white rounded-xl shadow p-6">
        {/* Header 操作列 */}
        <TableHeaderActions
          onSearchChange={handleSearchChange}
          onDeleteSelected={handleDeleteSelected}
          onRefresh={handleRefresh}
          selectedCount={selectedIds.length}
          search={search}
        />
        {/* 表格 */}
        <InvoiceTable
          invoices={Invoices}
          selectedIds={selectedIds}
          search={search}
          onSearchChange={handleSearchChange}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          onDeleteSelected={handleDeleteSelected}
          onRefresh={handleRefresh}
          isLoading={getAccountData.isLoading}
        />
        {/* 分頁 */}
        <Pagination
          totalCount={getAccountData.data?.totalCount ?? 0}
          pageSize={Invoices.length ?? 0}
          pageCount={Math.ceil((getAccountData.data?.totalCount ?? 0) / PAGE_SIZE)}
          currentPage={getAccountData.data?.currentPage ?? 1}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default Page;
