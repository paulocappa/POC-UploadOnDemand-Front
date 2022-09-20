import fileSize from 'filesize';
import FileResponse from '../@types/GetFileResponse';
import UploadFileData from '../@types/UploadFile';

export default function fileDataTransform(
  files: FileResponse[],
): UploadFileData[] {
  return files.map(file => ({
    id: file.id,
    name: file.filename,
    readableSize: fileSize(file.size),
    type: file.type,
    url: file.file_url,
    preview: file.type.includes('video/') ? file.thumb_url : file.file_url,
    uploaded: true,
  }));
}
