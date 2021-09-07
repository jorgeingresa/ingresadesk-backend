import { Document, model, Model, Schema } from 'mongoose';

export interface IFile {
  name: string;
  crc: string;
  md5: string;
  size: number;
}
export interface FileDocument extends IFile, Document {}

const FileSchema = new Schema<FileDocument>(
  {
    name: { type: String, required: true},
    crc: { type: String, required: true},
    md5: { type: String, required: true},
    size: { type: Number, required: true},
  },
  { _id : false },
);

export interface IRom {
  system: string;
  archive: IFile;
  files: IFile[];
}

export interface RomDocument extends IRom, Document {}

export interface RomModel extends Model<RomDocument> {}

const RomSchema = new Schema<RomDocument, RomModel>({
  system: { type: String, required: true },
  archive: { type: FileSchema, required: true },
  files: { type: [FileSchema], required: true, default: []},
});

RomSchema.index({ 'system': 1 });
RomSchema.index({ 'archive.crc': 1 });
RomSchema.index({ 'archive.md5': 1 });
RomSchema.index({ 'files.crc': 1 });
RomSchema.index({ 'files.md5': 1 });

export const romModel = model<RomDocument, RomModel>('Rom', RomSchema);
