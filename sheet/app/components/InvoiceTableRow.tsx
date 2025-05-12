import React, { useState } from 'react';
import Image from 'next/image';
import { AccountData } from '../api/mock';
import { TableRow, TableCell } from '@/components/ui/table';
import IconButton from '../../components/ui/iconButton';
import DeleteIcon from '../../components/icons/delete';
import ViewIcon from '../../components/icons/view';
import MoreIcon from '../../components/icons/more';

interface InvoiceTableRowProps {
  invoice: AccountData;
  selected: boolean;
  onSelectRow: (id: number) => void;
  onDelete: (id: number) => void;
}

const getAvatar = (id: number) => `/avatars/0${(id % 7) + 1}.png`;

function formatCurrency(amount: number) {
  return amount < 0 ? `-$${Math.abs(amount).toLocaleString()}` : `$${amount.toLocaleString()}`;
}

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
      <TableCell>
        <div className="flex items-center justify-center gap-3">
          <Image
            src={getAvatar(invoice.id)}
            alt={invoice.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full border"
          />
          <div>
            <div className="font-medium text-gray-900">{invoice.name}</div>
            <div className="text-xs text-gray-500">{invoice.mail}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-gray-500">{`$${invoice.totalBalance.toLocaleString()}`}</TableCell>
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
