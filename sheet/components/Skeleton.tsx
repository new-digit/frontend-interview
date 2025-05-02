"use client";

import React from "react";
import { pageSize } from "@/app/page";

type Props = {
  cellClass: string;
};

export default function Skeleton({ cellClass }: Props) {
  return (
    <tbody>
      {Array.from({ length: pageSize }).map((_, i) => (
        <tr key={i} className="animate-pulse border-b border-gray-200">
          {/* Checkbox */}
          <td className={`${cellClass} w-[40px]`}>
            <div className="h-4 bg-gray-200 rounded w-[16px]" />
          </td>

          {/* ID */}
          <td className={`${cellClass} w-[80px]`}>
            <div className="h-4 bg-gray-200 rounded w-[60px]" />
          </td>

          {/* Client */}
          <td className={`${cellClass} w-[240px]`}>
            <div className="h-4 bg-gray-200 rounded w-[160px] mb-1" />
            <div className="h-3 bg-gray-200 rounded w-[140px]" />
          </td>

          {/* Total */}
          <td className={`${cellClass} text-right w-[120px]`}>
            <div className="h-4 bg-gray-200 rounded w-[100px] inline-block" />
          </td>

          {/* Issued Date */}
          <td className={`${cellClass} text-right w-[160px]`}>
            <div className="h-4 bg-gray-200 rounded w-[130px] inline-block" />
          </td>

          {/* Balance */}
          <td className={`${cellClass} text-right w-[120px]`}>
            <div className="h-4 bg-gray-200 rounded w-[100px] inline-block" />
          </td>

          {/* Action */}
          <td className={`${cellClass} w-[100px]`}>
            <div className="h-4 bg-gray-200 rounded w-[70px]" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
