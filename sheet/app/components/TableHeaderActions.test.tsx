import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import TableHeaderActions from './TableHeaderActions';

describe('TableHeaderActions', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      onSearchChange: vi.fn(),
      onDeleteSelected: vi.fn(),
      onRefresh: vi.fn(),
      isDeleteDisabled: false,
      className: '',
      ...props,
    };
    render(<TableHeaderActions {...defaultProps} />);
    return defaultProps;
  };

  it('搜尋 input 變動時會呼叫 onSearchChange', async () => {
    const { onSearchChange } = setup();
    const input = screen.getByPlaceholderText('Search Invoice');
    fireEvent.change(input, { target: { value: 'test' } });
    // debounce 300ms
    await new Promise((r) => setTimeout(r, 350));
    expect(onSearchChange).toHaveBeenCalledWith('test');
  });

  it('點擊 DELETE 會呼叫 onDeleteSelected', () => {
    const { onDeleteSelected } = setup({ isDeleteDisabled: false });
    const btn = screen.getByRole('button', { name: /delete selected invoices/i });
    fireEvent.click(btn);
    expect(onDeleteSelected).toHaveBeenCalled();
  });

  it('isDeleteDisabled 是 true ，DELETE 按鈕會呈現 disabled 狀態，並且不能執行 onDeleteSelected', () => {
    const { onDeleteSelected } = setup({ isDeleteDisabled: true });
    const btn = screen.getByRole('button', { name: /delete selected invoices/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onDeleteSelected).not.toHaveBeenCalled();
  });

  it('點擊 REFRESH INVOICE 會呼叫 onRefresh', () => {
    const { onRefresh } = setup();
    const btn = screen.getByRole('button', { name: /refresh invoice/i });
    fireEvent.click(btn);
    expect(onRefresh).toHaveBeenCalled();
  });
});
