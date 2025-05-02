import { useCallback, useEffect, useState } from "react";
import { mockFetch, AccountData } from "@/app/api/mock";

export function useInvoiceQuery(page: number, pageSize: number) {
  const [data, setData] = useState<AccountData[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await mockFetch({ page, pageSize });
      setData(res.data);
      setTotal(res.total);
    } catch {
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    setData,
    total,
    loading,
    refetch: fetchData
  };
}
