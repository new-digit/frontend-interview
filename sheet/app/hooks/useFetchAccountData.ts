import { useRef, useCallback, useEffect, useReducer } from 'react';
import { mockFetch, AccountData } from '../api/mock';

interface FetchParams {
  page: number;
  pageSize: number;
  search?: string;
}

type State = {
  isLoading: boolean;
  data: {
    data: AccountData[];
    totalCount: number;
    currentPage: number;
  } | null;
  error: Error | null;
};

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: State['data'] }
  | { type: 'FETCH_ERROR'; error: Error };

const initialState: State = {
  isLoading: false,
  data: null,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null, data: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, data: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}

/**
 * 用於取得帳戶資料的自訂 Hook
 *
 * @returns {object} 包含以下屬性:
 * - isLoading: 是否正在取得資料中
 * - data: 帳戶資料，包含分頁資訊
 * - error: 錯誤訊息
 * - fetchData: 取得資料的函式，可傳入頁碼、每頁筆數、搜尋關鍵字
 */
export const useFetchAccountData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = useRef(true);
  // 用於避免競態條件
  const requestIdRef = useRef(0);

  const fetchData = useCallback(async ({ page, pageSize, search }: FetchParams) => {
    const currentRequestId = ++requestIdRef.current;
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await mockFetch({ page, pageSize, search });
      if (!isMounted.current) return;
      // 只處理最新的請求
      if (requestIdRef.current === currentRequestId) {
        dispatch({ type: 'FETCH_SUCCESS', payload: res });
      }
    } catch (err) {
      if (!isMounted.current) return;
      if (err instanceof Error) {
        dispatch({ type: 'FETCH_ERROR', error: err });
      } else {
        dispatch({ type: 'FETCH_ERROR', error: new Error('Unknown error occurred') });
      }
    }
  }, []);

  // 卸載時將 isMounted 設為 false 避免不必要的 setState 執行
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { ...state, fetchData };
};
