export interface IFileHash {
  name: string;
  crc: string;
  md5: string;
  size: number;
  unheadered?: {
    crc: string;
    md5: string;
    size: number;
  };
}