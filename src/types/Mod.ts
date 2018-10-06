export default interface Mod {
  id: string;
  name: string;
  authorId: string;
  authorName: string;
  downloads: number;
  likes: number;
  images: string[];
  smallImage: string;
  files: ModFile[] | undefined;
}

export interface ModFile {
  version: string;
  description: string;
  downloadLink: string;
}
