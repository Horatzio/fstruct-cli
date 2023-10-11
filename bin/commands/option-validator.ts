import * as fs from 'fs-extra'
import * as path from 'path';
import { FstructException } from '../exception/fstruct-exception'

export async function validateFolderExists(folder: string) {
    if (!(await fs.exists(folder))) {
        throw new FstructException(`Folder ${folder} does not exist.`)
    }
}

const ymlExtensions = [
    '.yml',
    '.yaml'
]

export async function validateFstructFileExists(file: string) {
    await validateFileExists(file);

    const extension = path.extname(file);
    if (!ymlExtensions.includes(extension)) {
        throw new FstructException(`Invalid file extension. Must be ${ymlExtensions.join(', ')}`)
    }
}

export async function validateFileExists(file: string) {
    if (!(await fs.exists(file))) {
        throw new FstructException(`File ${file} does not exist.`)
    }
}