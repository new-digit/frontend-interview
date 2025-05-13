import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Pagination from './pagination';

const defaultProps = {
  totalCount: 100,
  pageSize: 10,
  pageCount: 10,
  currentPage: 1,
  onPageChange: vi.fn(),
};

describe('分頁元件 Pagination', () => {
  it('應正確顯示起訖範圍與總數', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('1-10 of 100')).toBeInTheDocument();
  });

  it('中間頁數時應正確顯示範圍', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    expect(screen.getByText('21-30 of 100')).toBeInTheDocument();
  });

  it('載入中時應顯示 Skeleton 畫面', () => {
    render(<Pagination {...defaultProps} isLoading />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('totalCount 為 0 時應顯示 0-0', () => {
    render(<Pagination {...defaultProps} totalCount={0} />);
    expect(screen.getByText('0-0 of 0')).toBeInTheDocument();
  });

  it('有傳 customEnd 時應顯示自訂結束筆數', () => {
    render(<Pagination {...defaultProps} currentPage={2} customEnd={15} />);
    expect(screen.getByText('11-15 of 100')).toBeInTheDocument();
  });

  it('customEnd 為 0 時應顯示 0-0', () => {
    render(<Pagination {...defaultProps} customEnd={0} />);
    expect(screen.getByText('0-0 of 100')).toBeInTheDocument();
  });

  it('在第一頁時上一頁按鈕應為 disabled', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const prevBtn = screen.getByLabelText('Previous Page');
    expect(prevBtn).toBeDisabled();
  });

  it('在最後一頁時下一頁按鈕應為 disabled', () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    const nextBtn = screen.getByLabelText('Next Page');
    expect(nextBtn).toBeDisabled();
  });

  it('點擊上一頁按鈕時應呼叫 onPageChange 並帶入上一頁', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} currentPage={2} onPageChange={onPageChange} />);
    const prevBtn = screen.getByLabelText('Previous Page');
    fireEvent.click(prevBtn);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('點擊下一頁按鈕時應呼叫 onPageChange 並帶入下一頁', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} currentPage={2} onPageChange={onPageChange} />);
    const nextBtn = screen.getByLabelText('Next Page');
    fireEvent.click(nextBtn);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
