import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { generateVideoThumbnails } from '@rajesh896/video-thumbnails-generator';
import { uniqueId } from 'lodash';
import fileSize from 'filesize';

import FileList from '../../components/FileList';
import Upload from '../../components/Upload';
import Pagination, { IPaginationHandle } from '../../components/Pagination';

import UploadFileData from '../../@types/UploadFile';

import { Container, Content } from './styles';
import api from '../../services/api';
import FileResponse from '../../@types/GetFileResponse';
import fileDataTransform from '../../utils/fileDataTransform';
import { getFiles } from '../../services/files';

interface PaginationData {
  totalFiles: number;
  totalPages: number;
}

const LoginPage: React.FC = () => {
  const paginationRef = useRef<IPaginationHandle>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFileData[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    totalFiles: 0,
    totalPages: 0,
  });

  const handleGetFiles = useCallback(
    async ({ page = 1, limit = 5 }): Promise<void> => {
      try {
        setIsLoading(true);

        const { data } = await getFiles({ page, limit });

        const files = fileDataTransform(data.files);

        setPagination(data.pagination);
        setUploadedFiles(files);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    handleGetFiles({ page: 1, limit: 5 });
  }, [handleGetFiles]);

  useEffect(
    () => () => {
      uploadedFiles.forEach(f => URL.revokeObjectURL(f.preview));
    },
    [uploadedFiles],
  );

  const handleUpdateFile = useCallback(
    (id: string, data: Partial<UploadFileData>) => {
      setUploadedFiles(files =>
        files.map(file => (file.id === id ? { ...file, ...data } : file)),
      );
    },
    [],
  );

  const handleUploadProgress = useCallback(
    (e: ProgressEvent, id: string) => {
      const progress = Math.round((e.loaded * 100) / e.total);

      handleUpdateFile(id, { progress });
    },
    [handleUpdateFile],
  );

  const handleProcessFile = useCallback(
    async ({ file, id }: UploadFileData): Promise<void> => {
      try {
        if (file) {
          const formData = new FormData();

          formData.append('file', file);

          const { data } = await api.post<FileResponse>('files', formData, {
            onUploadProgress: (e: ProgressEvent) => handleUploadProgress(e, id),
          });

          handleUpdateFile(id, {
            id: data.id,
            name: data.filename,
            url: data.file_url,
            uploaded: true,
          });
        }
      } catch (error) {
        handleUpdateFile(id, { error: true });
      }
    },
    [handleUploadProgress, handleUpdateFile],
  );

  const handleUploadFiles = useCallback(
    async (files: File[]) => {
      const mappedFiles: UploadFileData[] = await Promise.all(
        files.map(async file => {
          const isVideo = file.type.includes('video/');

          let preview = '';

          if (isVideo) {
            const thumbnail = await generateVideoThumbnails(file, 1, 'jpeg');
            preview = thumbnail[1];
          }

          return {
            id: uniqueId(),
            file,
            name: file.name,
            type: file.type,
            readableSize: fileSize(file.size),
            preview: isVideo ? preview : URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
          };
        }),
      );

      setUploadedFiles(prev => mappedFiles.concat(prev));

      mappedFiles.forEach(handleProcessFile);
    },
    [handleProcessFile],
  );

  const handleDeleteFile = useCallback(async (id: string) => {
    await api.delete(`/files/${id}`);

    setUploadedFiles(files => files.filter(file => file.id !== id));
  }, []);

  const renderFileList = useMemo(() => {
    if (!uploadedFiles.length) return null;

    return <FileList files={uploadedFiles} onDelete={handleDeleteFile} />;
  }, [uploadedFiles, handleDeleteFile]);

  const renderPagination = useMemo(() => {
    if (!pagination.totalFiles) return null;

    return (
      <Pagination
        ref={paginationRef}
        totalPages={pagination.totalPages}
        isLoading={isLoading}
        onChangePage={handleGetFiles}
      />
    );
  }, [pagination, isLoading, handleGetFiles]);

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUploadFiles} />
        {renderFileList}
        {renderPagination}
      </Content>
    </Container>
  );
};

export default LoginPage;
