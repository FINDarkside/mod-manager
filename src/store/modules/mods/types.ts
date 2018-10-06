export interface Mod {
  id: string;
  name: string;
  shortDescription: string;
  authorId: string;
  authorName: string;
  downloads: number;
  likes: number;
  smallImage: string;
  installed?: InstalledModData | undefined;
}

export interface ModInfo {
  description: string;
  images: string[];
  files: ModFile[];
}

export interface ModFile {
  version: string;
  description: string;
  downloadLink: string;
}

export interface InstalledModData {
  updatesAvailable: boolean;
  installedVersion: string;
  newestVersion: string;
  filePath: string;
  active: boolean;
}
