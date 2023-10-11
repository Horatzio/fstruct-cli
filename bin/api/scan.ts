import * as fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'yaml';
import { FolderStructure } from './model/folder-structure';

export async function executeScan(targetFolder: string, fstructFile: string) {
    const folderStructure = await scanFolder(targetFolder);
    const yamlContent = yaml.stringify(folderStructure);

    const fstructFilePath = path.join(targetFolder, fstructFile);
    await fs.writeFile(fstructFilePath, yamlContent);
}

async function scanFolder(folder: string): Promise<FolderStructure> {
    const folderName = path.basename(folder);
    const files = await fs.readdir(folder);
    const contents: (FolderStructure | string)[] = [];

    for (const file of files) {
        const filePath = path.join(folder, file);
        const stats = await fs.lstat(filePath);
        if (stats.isSymbolicLink()) {
            const linkPath = await fs.readlink(filePath);

            if (stats.isDirectory()) {
                contents.push({
                    [`${file}->"${linkPath}"`]: []
                });
            } else {
                contents.push(`${file}->"${linkPath}"`);
            }
        }
        else if (stats.isDirectory()) {
            contents.push(await scanFolder(filePath));
        } else {
            contents.push(file);
        }
    }

    return {
        [folderName]: contents,
    }
}
