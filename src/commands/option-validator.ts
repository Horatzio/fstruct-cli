import * as fs from 'fs-extra'
import * as path from 'path';
import { FstructArgumentException } from '../exception/exceptions'

export async function validateFolderExists(folder: string) {
    if (!(await fs.exists(folder))) {
        throw new FstructArgumentException(`Folder ${folder} does not exist.`)
    }
}

const ymlExtensions = [
    '.yml',
    '.yaml'
]

export async function validateYmlFileExists(file: string) {
    await validateFileExists(file);

    const extension = path.extname(file);
    if (!ymlExtensions.includes(extension)) {
        throw new FstructArgumentException(`Invalid file extension. Must be [${ymlExtensions.join(', ')}]`)
    }
}

export async function validateFileExists(file: string) {
    if (!(await fs.exists(file))) {
        throw new FstructArgumentException(`File ${file} does not exist.`)
    }
}