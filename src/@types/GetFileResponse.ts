export default interface FileResponse {
  id: string;
  filename: string;
  file_url: string;
  thumb_url: string;
  size: number;
  type: string;
  created_at: Date;
  updated_at: Date;
}
