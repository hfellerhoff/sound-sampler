export interface File {
  name: string;
  uri: string;
  isDirectory: boolean;
  children: File[];
}
