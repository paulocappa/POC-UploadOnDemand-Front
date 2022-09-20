import { AxiosResponse } from 'axios';
import FileResponse from '../@types/GetFileResponse';
import api from './api';

const BASE_URL = 'files';

interface ListFilesResponse {
  files: FileResponse[];
  pagination: {
    totalFiles: number;
    totalPages: number;
  };
}

export const getFiles = async ({
  page = 1,
  limit = 10,
}): Promise<AxiosResponse<ListFilesResponse>> => {
  return api.get<ListFilesResponse>(
    `${BASE_URL}?page=${page}&per_page=${limit}`,
  );
};
