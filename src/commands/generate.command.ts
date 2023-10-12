import { DEFAULTS } from '../config';
import { Command } from 'commander';
import { executeGenerate } from '../api/generate/generate';
import { validateFstructFileExists } from './option-validator';

export const generateCommand = new Command("generate")
    .description("Generate the folder structure.")
    .option("-f --file <file>", `Specify a file to load the folder structure from. Defaults to ${DEFAULTS.fstructFile}.`, DEFAULTS.fstructFile)
    .action(async (options) => {
        await validateFstructFileExists(options.file);
        await executeGenerate(options.file);
    });