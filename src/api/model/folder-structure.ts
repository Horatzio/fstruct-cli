export type FolderStructure = {
    [folderName: string]: (FolderStructure | string)[];
};