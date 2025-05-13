import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import InvoiceTable from './InvoiceTable';
import type { AccountData } from '../api/mock';

const MOCK_DATA: AccountData[] = [
  {
    id: 1,
    name: 'A',
    mail: 'a@mail.com',
    totalBalance: 100,
    balance: 50,
    issueDate: 1,
    hasPaid: true,
  },
  {
    id: 2,
    name: 'B',
    mail: 'b@mail.com',
    totalBalance: 200,
    balance: 0,
    issueDate: 2,
    hasPaid: false,
  },
];

describe('InvoiceTable', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      invoices: MOCK_DATA,
      selectedIds: [],
      onSelectAll: vi.fn(),
      onSelectRow: vi.fn(),
      onDelete: vi.fn(),
      showSelectAll: true,
      showSkeleton: false,
      ...props,
    };
    render(<InvoiceTable {...defaultProps} />);
    return defaultProps;
  };

  it('正常渲染多筆資料', () => {
    setup();
    expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('showSkeleton 時要顯示 skeleton', () => {
    setup({ showSkeleton: true });
    expect(screen.queryByText('A')).not.toBeInTheDocument();
    expect(screen.queryByText('B')).not.toBeInTheDocument();
    expect(screen.getAllByText('', { selector: '.w-4.h-4' }).length).toBeGreaterThan(0);
  });

  it('showSelectAll 為 false 時，全選按鈕要消失', () => {
    setup({ showSelectAll: false, invoices: [] });
    expect(screen.queryByLabelText('Select All')).not.toBeInTheDocument();
  });

  it('全選 checkbox 行為', () => {
    const { onSelectAll } = setup();
    const checkbox = screen.queryByLabelText('Select All');
    fireEvent.click(checkbox);
    expect(onSelectAll).toHaveBeenCalled();
  });

  it('單筆選取/刪除', () => {
    const { onSelectRow, onDelete } = setup({ selectedIds: [1] });
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);
    expect(onSelectRow).toHaveBeenCalledWith(1);
    const deleteBtns = screen.getAllByLabelText('Delete Invoice');
    fireEvent.click(deleteBtns[0]);
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it('無資料時要顯示無資料的訊息', () => {
    setup({ invoices: [], showSkeleton: false });
    expect(screen.getByText('無資料')).toBeInTheDocument();
  });
});
