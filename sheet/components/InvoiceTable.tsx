"use client";

import React from "react";
import { AccountData } from "@/app/api/mock";
import Skeleton from "./Skeleton";

const formatDate = (timestamp: number) => {
  const d = new Date(timestamp);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

type Props = {
  data: AccountData[];
  loading: boolean;
  page: number;
  pageSize: number;
  total: number;
  selectedIds: number[];
  toggledIds: number[];
  onToggle: (id: number) => void;
  onToggleAll: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  toggleBalanceDisplay: (id: number) => void;
};

export default function InvoiceTable({
  data,
  loading,
  page,
  pageSize,
  total,
  selectedIds,
  toggledIds,
  onToggle,
  onToggleAll,
  onPrevPage,
  onNextPage,
  toggleBalanceDisplay
}: Props) {
  const cellClass = "box-content px-4 py-3";
  return (
    <div>
      <table className="min-w-full table-fixed border-collapse h-[680px]">
        <thead className="bg-gray-100 text-gray-700 text-sm font-medium uppercase h-[70px]">
          <tr className="border-b border-gray-200">
            <th className={`${cellClass} text-left w-[40px]`}>
              <input
                type="checkbox"
                onChange={onToggleAll}
                checked={selectedIds.length === data.length && data.length > 0}
              />
            </th>
            <th className={`${cellClass} text-center w-[80px]`}>ID</th>
            <th className={`${cellClass} text-center w-[240px]`}>Client</th>
            <th className={`${cellClass} text-center w-[120px]`}>Total</th>
            <th className={`${cellClass} text-center w-[160px]`}>
              Issued Date
            </th>
            <th className={`${cellClass} text-center w-[120px]`}>Balance</th>
            <th className={`${cellClass} text-center w-[100px]`}>Action</th>
          </tr>
        </thead>

        {loading ? (
          <Skeleton cellClass={cellClass} />
        ) : (
          <tbody className="text-gray-800 text-sm">
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b border-gray-200 h-[65px]`}
              >
                <td className={`${cellClass} w-[40px]`}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => onToggle(item.id)}
                  />
                </td>
                <td
                  className={`${cellClass} text-purple-500 font-medium w-[80px] text-center`}
                >
                  #{item.id}
                </td>
                <td className={`${cellClass} w-[240px]`}>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.mail}</div>
                </td>
                <td className={`${cellClass} text-right w-[120px]`}>
                  ${item.totalBalance.toFixed(2)}
                </td>
                <td className={`${cellClass} text-right w-[160px]`}>
                  {formatDate(item.issueDate)}
                </td>
                <td className={`${cellClass} text-center w-[120px]`}>
                  {toggledIds.includes(item.id) ? (
                    <span className="inline-block bg-green-100 text-green-600 text-sm px-4 py-1 rounded-full">
                      Paid
                    </span>
                  ) : (
                    <span>${item.balance.toFixed(2)}</span>
                  )}
                </td>
                <td className={`${cellClass} w-[100px] text-lg`}>
                  <div className="flex justify-between">
                    <button className="cursor-pointer">🗑️</button>
                    <button
                      className="cursor-pointer"
                      onClick={() => toggleBalanceDisplay(item.id)}
                    >
                      👁️
                    </button>
                    <button className="cursor-pointer">⋮</button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length < pageSize &&
              Array.from({ length: pageSize - data.length }).map((_, i) => (
                <tr key={`pad-${i}`}>
                  {Array.from({ length: 7 }).map((__, j) => (
                    <td key={j} className={cellClass} />
                  ))}
                </tr>
              ))}
          </tbody>
        )}
      </table>

      <div className="flex justify-end items-center mt-4 gap-8 text-sm text-gray-700">
        <span>
          {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of{" "}
          {total}
        </span>
        <button
          onClick={onPrevPage}
          disabled={page === 1}
          className="text-[22px] leading-none disabled:text-gray-300"
        >
          ‹
        </button>
        <button
          onClick={onNextPage}
          disabled={page * pageSize >= total}
          className="text-[22px] leading-none disabled:text-gray-300"
        >
          ›
        </button>
      </div>
    </div>
  );
}
