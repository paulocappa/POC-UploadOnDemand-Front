import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import UploadFileData from '../../@types/UploadFile';

import { Container, FileIcons, FileInfo, Preview } from './styles';

interface FileListProps {
  files: UploadFileData[];
  onDelete: (id: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDelete }) => {
  return (
    <Container>
      {files.map(file => (
        <li key={file.id}>
          <FileInfo>
            <Preview src={file.preview} />
            <div>
              <strong>{file.name}</strong>
              <span>
                {file.readableSize}{' '}
                {file.url && (
                  <button onClick={() => onDelete(file.id)}>Excluir</button>
                )}
              </span>
            </div>
          </FileInfo>

          <FileIcons>
            {!file.uploaded && !file.error && (
              <CircularProgressbar
                value={file.progress ?? 0}
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#78e5d5' },
                }}
                strokeWidth={10}
              />
            )}

            {file.url && (
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
              </a>
            )}

            {file.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
            {file.error && <MdError size={24} color="#e57878" />}
          </FileIcons>
        </li>
      ))}
    </Container>
  );
};

export default FileList;
