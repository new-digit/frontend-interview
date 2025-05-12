import { useRef, useCallback, useEffect, useReducer } from 'react';
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

export const useFetchAccountData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = useRef(true);

  const fetchData = useCallback(async ({ page, pageSize, search }: FetchParams) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await mockFetch({ page, pageSize, search });
      if (!isMounted.current) return;
      dispatch({ type: 'FETCH_SUCCESS', payload: res });
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
