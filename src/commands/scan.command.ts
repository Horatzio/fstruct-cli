import { executeScan } from '../api/scan/scan';
import { DEFAULTS } from '../config';
import { Command } from 'commander';
import { validateFolderExists } from './option-validator';
import { initConfig } from '../api/config/config';

export const scanCommand = new Command("scan")
    .description("Scan a folder and generate a folder structure from it.")
    .option("-fd --folder <folder>", `Specify folder to scan. Defaults to current directory.`, DEFAULTS.currentDir)
    .option("-f --file <file>", `Specify the file to write the folder structure to. Defaults to ${DEFAULTS.fstructFile}.`, DEFAULTS.fstructFile)
    .action(async (options) => {
        await initConfig(options.config);
        await validateFolderExists(options.folder);
        await executeScan(options.folder, options.file);
    });

    