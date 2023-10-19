import { DEFAULTS } from '../config';
import { Command } from 'commander';
import { executeGenerate } from '../api/generate/generate';
import { validateYmlFileExists } from './option-validator';
import { initConfig } from "src/api/config/config";

export const generateCommand = new Command("generate")
    .description("Generate the folder structure.")
    .option("-f --file <file>", `Specify a file to load the folder structure from. Defaults to ${DEFAULTS.fstructFile}.`, DEFAULTS.fstructFile)
    .action(async (options) => {
        await initConfig(options.config);
        await validateYmlFileExists(options.file);
        await executeGenerate(options.file);
    });