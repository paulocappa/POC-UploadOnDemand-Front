import React, { useMemo } from 'react';

import { useDropzone } from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

interface UploadProps {
  onUpload: (files: File[]) => void;
}

const Upload: React.FC<UploadProps> = ({ onUpload }) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        'image/*': [],
        'video/*': [],
      },
      multiple: true,
      onDropAccepted: onUpload,
    });

  const renderDragMessage: JSX.Element = useMemo(() => {
    if (!isDragActive) {
      return <UploadMessage>Arraste arquivos aqui...</UploadMessage>;
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>;
  }, [isDragActive, isDragReject]);

  return (
    <DropContainer
      {...getRootProps()}
      isDragActive={isDragActive}
      isDragReject={isDragReject}
    >
      <input {...getInputProps()} />
      {renderDragMessage}
    </DropContainer>
  );
};

export default Upload;
