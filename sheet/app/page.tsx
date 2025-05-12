'use client';
import React, { useEffect, useState } from 'react';
import InvoiceTable from './components/InvoiceTable';
import { useFetchAccountData } from './hooks/useFetchAccountData';
import Pagination from '@/components/ui/Pagination';
import TableHeaderActions from './components/TableHeaderActions';

const PAGE_SIZE = 10;

const Page = () => {
  // 因作業關係，並無需要執行 API，因此使用狀態來模擬已被刪除的收款單，並會在搜尋或是換頁時重置
  const [removeInvoiceIds, setRemoveInvoiceIds] = useState<number[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const getAccountData = useFetchAccountData();

  useEffect(() => {
    getAccountData.fetchData({ page: 1, pageSize: PAGE_SIZE });
  }, []);

  // 收款單列表
  const Invoices =
    getAccountData.data?.data.filter((Invoice) => !removeInvoiceIds.includes(Invoice.id)) ?? [];

  const isError = !!getAccountData.error;

  // 重置刪除的收款單
  const resetRemoveInvoiceIds = () => {
    setRemoveInvoiceIds([]);
  };

  // 重置選取的收款單
  const resetSelectedIds = () => {
    setSelectedIds([]);
  };

  // 全選
  const handleSelectAll = () => {
    if (selectedIds.length === Invoices.length) {
      resetSelectedIds();
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

  // 刪除目前選取的收款單
  const handleDeleteSelected = () => {
    setRemoveInvoiceIds((prev) => [...prev, ...selectedIds]);
    resetSelectedIds();
  };

  // 刪除單筆收款單
  const handleDeleteSingle = (id: number) => {
    setRemoveInvoiceIds((prev) => [...prev, id]);
    resetSelectedIds();
  };

  // 刷新收款單列表
  const handleRefresh = () => {
    getAccountData.fetchData({ page: 1, pageSize: PAGE_SIZE });
    resetSelectedIds();
    resetRemoveInvoiceIds();
  };

  // 搜尋收款單
  const handleSearchChange = (value: string) => {
    getAccountData.fetchData({ page: 1, pageSize: PAGE_SIZE, search: value });
    resetSelectedIds();
    resetRemoveInvoiceIds();
  };

  // 換頁
  const handlePageChange = (page: number) => {
    getAccountData.fetchData({ page, pageSize: PAGE_SIZE });
    resetSelectedIds();
    resetRemoveInvoiceIds();
  };

  return (
    <main className="m-8">
      <div className="bg-white rounded-xl shadow py-6">
        {/* Header 操作列 */}
        <TableHeaderActions
          className="px-6"
          onSearchChange={handleSearchChange}
          onDeleteSelected={handleDeleteSelected}
          onRefresh={handleRefresh}
          selectedCount={selectedIds.length}
        />
        {/* 錯誤訊息 */}
        {isError && (
          <div className="mt-4 text-red-500 text-center">
            <p className="font-semibold text-lg mb-2">無法取得資料</p>
            <p>請嘗試重新搜尋，或稍後再試。</p>
          </div>
        )}
        {!isError && (
          <>
            {/* 表格 */}
            <InvoiceTable
              invoices={Invoices}
              selectedIds={selectedIds}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              onDelete={handleDeleteSingle}
              isLoading={getAccountData.isLoading}
            />
            {/* 分頁 */}
            <Pagination
              className="px-6"
              totalCount={getAccountData.data?.totalCount ?? 0}
              pageSize={PAGE_SIZE}
              pageCount={Math.ceil((getAccountData.data?.totalCount ?? 0) / PAGE_SIZE)}
              currentPage={getAccountData.data?.currentPage ?? 1}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default Page;
