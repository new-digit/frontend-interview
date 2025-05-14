import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import InvoiceTableRow from './InvoiceTableRow';
import type { AccountData } from '../api/mock';

const MOCK_INVOICE: AccountData = {
  id: 1,
  name: 'Alice',
  mail: 'alice@mail.com',
  totalBalance: 1000,
  balance: 500,
  issueDate: 1710000000000,
  hasPaid: false,
};

describe('InvoiceTableRow', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      invoice: MOCK_INVOICE,
      selected: false,
      onSelectRow: vi.fn(),
      onDelete: vi.fn(),
      ...props,
    };
    render(<InvoiceTableRow {...defaultProps} />);
    return defaultProps;
  };

  it('勾選 checkbox 會呼叫 onSelectRow', () => {
    const { onSelectRow } = setup();
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onSelectRow).toHaveBeenCalledWith(MOCK_INVOICE.id);
  });

  it('點擊刪除會呼叫 onDelete', () => {
    const { onDelete } = setup();
    const btn = screen.getByLabelText('Delete Invoice');
    fireEvent.click(btn);
    expect(onDelete).toHaveBeenCalledWith(MOCK_INVOICE.id);
  });

  it('點擊 View 會切換顯示 balance/status', () => {
    setup();
    const btn = screen.getByLabelText('View Invoice');
    expect(screen.getByText('Unpaid')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText('Unpaid')).not.toBeInTheDocument();
    expect(screen.getByText(/\$500/)).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.getByText('Unpaid')).toBeInTheDocument();
  });

  it('顯示正確的 name、mail、金額、日期、狀態', () => {
    setup();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('alice@mail.com')).toBeInTheDocument();
    expect(screen.getByText(/\$1,000/)).toBeInTheDocument();
    expect(screen.getByText(/2024/)).toBeInTheDocument();
    expect(screen.getByText('Unpaid')).toBeInTheDocument();
  });
});
