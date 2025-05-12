import { useRef, useState, useCallback, useEffect } from 'react';
import { mockFetch, AccountData } from '../api/mock';

interface UseFetchAccountDataOptions {
  onSuccess?: (data: AccountData[]) => void;
  onError?: (error: Error) => void;
}

interface FetchParams {
  page: number;
  pageSize: number;
  search?: string;
}

export const useFetchAccountData = ({ onSuccess, onError }: UseFetchAccountDataOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{
    data: AccountData[];
    totalCount: number;
    currentPage: number;
  } | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef(true);

  const fetchData = useCallback(
    async ({ page, pageSize, search }: FetchParams) => {
      isMounted.current = true;
      setIsLoading(true);
      setError(null);
      setData(null);
      try {
        const res = await mockFetch({ page, pageSize, search });
        if (!isMounted.current) return;
        setData(res);
        setIsLoading(false);
        onSuccess?.(res.data);
      } catch (err) {
        if (!isMounted.current) return;
        setError(err as Error);
        setIsLoading(false);
        onError?.(err as Error);
      }
    },
    [onSuccess, onError],
  );

  // 清理 isMounted 狀態
  // 父層 unmount 時可確保不執行 setState 操作
  // 若需自動清理可在父層 useEffect return 呼叫 isMounted.current = false
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { isLoading, data, error, fetchData };
};
