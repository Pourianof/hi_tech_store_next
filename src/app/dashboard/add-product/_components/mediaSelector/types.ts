export interface FormProductMedia {
  file: File;
  url?: string; // for in-app file display
  type: string;
  thumbnailUrl?: string;
  thumbnail?: File;
}
