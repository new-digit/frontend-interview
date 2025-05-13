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
      selectedCount: 1,
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
    const { onDeleteSelected } = setup({ selectedCount: 2 });
    const btn = screen.getByRole('button', { name: /delete selected invoices/i });
    fireEvent.click(btn);
    expect(onDeleteSelected).toHaveBeenCalled();
  });

  it('若是沒有選擇物件，DELETE 按鈕會呈現 disabled 狀態', () => {
    setup({ selectedCount: 0 });
    const btn = screen.getByRole('button', { name: /delete selected invoices/i });
    expect(btn).toBeDisabled();
  });

  it('點擊 REFRESH INVOICE 會呼叫 onRefresh', () => {
    const { onRefresh } = setup();
    const btn = screen.getByRole('button', { name: /refresh invoice/i });
    fireEvent.click(btn);
    expect(onRefresh).toHaveBeenCalled();
  });

  it('按下 Enter 會呼叫 onDeleteSelected', () => {
    const { onDeleteSelected } = setup({ selectedCount: 2 });
    const btn = screen.getByRole('button', { name: /delete selected invoices/i });
    fireEvent.keyDown(btn, { key: 'Enter' });
    expect(onDeleteSelected).toHaveBeenCalled();
  });

  it('按下 Enter 會呼叫 onRefresh', () => {
    const { onRefresh } = setup();
    const btn = screen.getByRole('button', { name: /refresh invoice/i });
    fireEvent.keyDown(btn, { key: 'Enter' });
    expect(onRefresh).toHaveBeenCalled();
  });
});
