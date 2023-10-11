import * as fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'yaml';
import { FolderStructure } from '../model/folder-structure';
import { createFolderStructure } from './create-folder-structure';

export async function executeGenerate(file: string) {
    const rootDir = process.cwd();
    const filePath = path.join(rootDir, file);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const folderStruture = yaml.parse(fileContent) as FolderStructure;
    
    await createFolderStructure(rootDir, folderStruture);
}