import React, {
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from 'react';

import { ChevronLeft, ChevronRight, Container, Limit, Page } from './styles';

export interface IPaginationHandle {
  page: number;
  limit: number;
  nextPage: () => Promise<void>;
  previousPage: () => Promise<void>;
}

interface OnChangePageProps {
  page: number;
  limit: number;
}

interface PaginationProps {
  onChangePage: (data: OnChangePageProps) => Promise<void>;
  totalPages: number;
  isLoading: boolean;
}

const Pagination: React.ForwardRefRenderFunction<
  IPaginationHandle,
  PaginationProps
> = ({ onChangePage, totalPages, isLoading }, ref) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const nextPage = useCallback(async () => {
    const newPage = page + 1;
    setPage(newPage);

    await onChangePage({ page: newPage, limit });
  }, [page, limit, onChangePage]);

  const previousPage = useCallback(async () => {
    const newPage = page - 1;
    setPage(newPage);

    await onChangePage({ page: newPage, limit });
  }, [page, limit, onChangePage]);

  useImperativeHandle(ref, () => ({
    page,
    limit,
    nextPage,
    previousPage,
  }));

  const handleOnChangeLimit = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = Number(e.target.value);

      if (value !== limit) {
        setLimit(value);

        setPage(1);
        await onChangePage({ page: 1, limit: value });
      }
    },
    [limit, onChangePage],
  );

  return (
    <Container>
      <Page>
        <button onClick={previousPage} disabled={page === 1 || isLoading}>
          <ChevronLeft disabled={page === 1 || isLoading} />
        </button>
        <span>
          Página <strong>{page}</strong> de {totalPages}
        </span>
        <button onClick={nextPage} disabled={page === totalPages || isLoading}>
          <ChevronRight disabled={page === totalPages || isLoading} />
        </button>
      </Page>
      <Limit disabled={isLoading}>
        <p>Limite por página</p>
        <select value={limit} onChange={handleOnChangeLimit}>
          <option value={5}>05</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </Limit>
    </Container>
  );
};

export default forwardRef(Pagination);
