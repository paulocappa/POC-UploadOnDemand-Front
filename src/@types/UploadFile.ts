export default interface UploadFileData {
  id: string;
  file?: File;
  name: string;
  type: string;
  readableSize: string;
  preview: string;
  uploaded: boolean;
  progress?: number;
  error?: boolean;
  url?: string;
}
