import { DEFAULTS } from '../config';
import { Command } from 'commander';

export const validateCommand = new Command("validate")
    .description("Validate the folder structure file.")
    .option("-f --file <file>", `Specify the file to validate. Defaults to ${DEFAULTS.fstructFile}.`, DEFAULTS.fstructFile);