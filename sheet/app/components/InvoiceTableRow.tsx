import React, { useState } from 'react';
import { AccountData } from '../api/mock';
import { TableRow, TableCell } from '@/components/ui/table';
import IconButton from '../../components/ui/iconButton';
import DeleteIcon from '../../components/icons/delete';
import ViewIcon from '../../components/icons/view';
import MoreIcon from '../../components/icons/more';
import Avatar from '@/components/ui/avatar';

interface InvoiceTableRowProps {
  invoice: AccountData;
  selected: boolean;
  onSelectRow: (id: number) => void;
  onDelete: (id: number) => void;
}

function formatCurrency(amount: number) {
  return amount < 0 ? `-$${Math.abs(amount).toLocaleString()}` : `$${amount.toLocaleString()}`;
}

// 因作業需要，使用八張圖片進行示範，因此使用 id 來取得圖片
const getAvatarSrc = (id: number) => `/profile-${(id % 8) + 1}.png`;

const renderStatus = (hasPaid: boolean) => {
  if (hasPaid)
    return (
      <span className="bg-green-100 text-green-400 rounded-full px-3 py-1 text-sm font-medium">
        Paid
      </span>
    );
  return (
    <span className="bg-red-400 text-white rounded-full px-3 py-1 text-sm font-medium">Unpaid</span>
  );
};

const InvoiceTableRow: React.FC<InvoiceTableRowProps> = ({
  invoice,
  selected,
  onSelectRow,
  onDelete,
}) => {
  const [showBalance, setShowBalance] = useState(false);

  const handleShowBalance = () => {
    setShowBalance(!showBalance);
  };

  return (
    <TableRow key={invoice.id} data-state={selected ? 'selected' : undefined}>
      <TableCell className="pl-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelectRow(invoice.id)}
            aria-label={`Select invoice ${invoice.id}`}
            tabIndex={0}
            className="accent-primary w-4 h-4"
          />
        </div>
      </TableCell>
      <TableCell>
        <span className="text-purple-500">#{invoice.id}</span>
      </TableCell>
      <TableCell className="flex justify-center min-w-[250px]">
        <div className="flex items-center gap-3 w-full max-w-[250px]">
          <Avatar src={getAvatarSrc(invoice.id)} alt={invoice.name} />
          <div className="text-left max-w-[200px]">
            <div className="font-medium text-gray-900 text-ellipsis overflow-hidden whitespace-nowrap">
              {invoice.name}
            </div>
            <div className="text-xs text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap">
              {invoice.mail}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-gray-500 text-right">{`$${invoice.totalBalance.toLocaleString()}`}</TableCell>
      <TableCell className="text-gray-500">
        {new Date(invoice.issueDate).toLocaleDateString()}
      </TableCell>
      <TableCell>
        {showBalance ? formatCurrency(invoice.balance) : renderStatus(invoice.hasPaid)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-6 justify-center">
          <IconButton
            aria-label="Delete Invoice"
            tabIndex={0}
            className="text-gray-400 hover:text-gray-700"
            onClick={() => onDelete(invoice.id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="View Invoice"
            tabIndex={0}
            className="text-gray-400 hover:text-gray-700"
            onClick={handleShowBalance}
          >
            <ViewIcon />
          </IconButton>
          <IconButton
            aria-label="More Actions"
            tabIndex={0}
            className="text-gray-400 hover:text-gray-700"
          >
            <MoreIcon />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default InvoiceTableRow;
