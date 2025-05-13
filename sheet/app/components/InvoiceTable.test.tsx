// import React from 'react';
// import { describe, it, expect, vi } from 'vitest';
// import { render, fireEvent, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/vitest';
// import InvoiceTable from './InvoiceTable';
// import type { AccountData } from '../api/mock';

// const MOCK_DATA: AccountData[] = [
//   {
//     id: 1,
//     name: 'A',
//     mail: 'a@mail.com',
//     totalBalance: 100,
//     balance: 50,
//     issueDate: 1,
//     hasPaid: true,
//   },
//   {
//     id: 2,
//     name: 'B',
//     mail: 'b@mail.com',
//     totalBalance: 200,
//     balance: 0,
//     issueDate: 2,
//     hasPaid: false,
//   },
// ];

// describe('InvoiceTable', () => {
//   const setup = (props = {}) => {
//     const defaultProps = {
//       invoices: MOCK_DATA,
//       selectedIds: [],
//       onSelectAll: vi.fn(),
//       onSelectRow: vi.fn(),
//       onDelete: vi.fn(),
//       isLoading: false,
//       ...props,
//     };
//     render(<InvoiceTable {...defaultProps} />);
//     return defaultProps;
//   };

//   it('正常渲染多筆資料', () => {
//     setup();
//     expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0);
//     expect(screen.getByText('A')).toBeInTheDocument();
//     expect(screen.getByText('B')).toBeInTheDocument();
//   });

//   it('isLoading 狀態下顯示 skeleton', () => {
//     setup({ isLoading: true });
//     expect(screen.queryByText('A')).not.toBeInTheDocument();
//     expect(screen.queryByText('B')).not.toBeInTheDocument();
//     expect(screen.getAllByText('', { selector: '.w-4.h-4' }).length).toBeGreaterThan(0);
//   });

//   it('全選 checkbox 行為', () => {
//     const { onSelectAll } = setup();
//     const checkbox = screen.getAllByRole('checkbox')[0];
//     fireEvent.click(checkbox);
//     expect(onSelectAll).toHaveBeenCalled();
//   });

//   it('單筆選取/刪除', () => {
//     const { onSelectRow, onDelete } = setup({ selectedIds: [1] });
//     const checkboxes = screen.getAllByRole('checkbox');
//     fireEvent.click(checkboxes[1]);
//     expect(onSelectRow).toHaveBeenCalledWith(1);
//     const deleteBtns = screen.getAllByLabelText('Delete Invoice');
//     fireEvent.click(deleteBtns[0]);
//     expect(onDelete).toHaveBeenCalledWith(1);
//   });

//   describe('錯誤與邊界值', () => {
//     it('invoices 為空陣列', () => {
//       setup({ invoices: [] });
//       expect(screen.queryAllByRole('checkbox').length).toBe(1); // 只剩全選
//     });
//     it('selectedIds 為空', () => {
//       setup({ selectedIds: [] });
//       expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
//     });
//     it('onSelectAll 為 undefined', () => {
//       setup({ onSelectAll: undefined });
//       const checkbox = screen.getAllByRole('checkbox')[0];
//       fireEvent.click(checkbox);
//     });
//     it('onSelectRow 為 undefined', () => {
//       setup({ onSelectRow: undefined });
//       const checkboxes = screen.getAllByRole('checkbox');
//       if (checkboxes[1]) fireEvent.click(checkboxes[1]);
//     });
//     it('onDelete 為 undefined', () => {
//       setup({ onDelete: undefined });
//       const deleteBtns = screen.queryAllByLabelText('Delete Invoice');
//       if (deleteBtns[0]) fireEvent.click(deleteBtns[0]);
//     });
//     it('onSelectAll 為 null', () => {
//       setup({ onSelectAll: null });
//       const checkbox = screen.getAllByRole('checkbox')[0];
//       fireEvent.click(checkbox);
//     });
//     it('onSelectRow 為 null', () => {
//       setup({ onSelectRow: null });
//       const checkboxes = screen.getAllByRole('checkbox');
//       if (checkboxes[1]) fireEvent.click(checkboxes[1]);
//     });
//     it('onDelete 為 null', () => {
//       setup({ onDelete: null });
//       const deleteBtns = screen.queryAllByLabelText('Delete Invoice');
//       if (deleteBtns[0]) fireEvent.click(deleteBtns[0]);
//     });
//   });
// });
