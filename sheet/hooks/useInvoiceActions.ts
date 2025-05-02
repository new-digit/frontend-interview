import { useMemo, useState } from "react";
import { AccountData } from "@/app/api/mock";
import { useDebouncedValue } from "./useDebouncedValue";

export function useInvoiceActions(
  data: AccountData[],
  setData: React.Dispatch<React.SetStateAction<AccountData[]>>
) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [toggledIds, setToggledIds] = useState<number[]>([]); // 👁️ 切換狀態

  const debouncedSearch = useDebouncedValue(
    searchInput.trim().toLowerCase(),
    300
  );

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;
    return data.filter((d) =>
      [d.name, d.mail, d.id.toString()].some((field) =>
        field.toLowerCase().includes(debouncedSearch)
      )
    );
  }, [debouncedSearch, data]);

  const handleToggle = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map((d) => d.id));
    }
  };

  const handleDeleteSelected = () => {
    setData((prev) => prev.filter((d) => !selectedIds.includes(d.id)));
    setSelectedIds([]);
  };

  const toggleBalanceDisplay = (id: number) => {
    setToggledIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return {
    searchInput,
    setSearchInput,
    filteredData,
    selectedIds,
    handleToggle,
    handleToggleAll,
    handleDeleteSelected,
    toggledIds,
    toggleBalanceDisplay,
    resetSelection: () => setSelectedIds([])
  };
}
