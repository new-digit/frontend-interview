type Props = {
  onRefresh: () => void;
  onDelete: () => void;
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TableToolbar({
  onRefresh,
  onDelete,
  search,
  onSearchChange
}: Props) {
  return (
    <div className="flex justify-end items-center mb-4 gap-4 text-sm">
      <input
        type="text"
        placeholder="Search Invoice"
        value={search}
        onChange={onSearchChange}
        className="border border-gray-400 placeholder-gray-500 text-gray-800 text-sm rounded px-3 py-2 w-[150px] focus:outline-none focus:ring-0"
      />
      <button
        onClick={onDelete}
        className="bg-red-500 text-white rounded w-[150px] h-[42px]"
      >
        DELETE
      </button>
      <button
        onClick={onRefresh}
        className="bg-purple-500 text-white rounded w-[150px] h-[42px]"
      >
        REFRESH INVOICE
      </button>
    </div>
  );
}
