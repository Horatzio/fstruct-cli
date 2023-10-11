import { DEFAULTS } from '../config';
import { Command } from 'commander';

export const watchCommand = new Command("watch")
    .description("Watch the folder structure file for changes and updates the folder accordingly.")
    .option("-f --file <file>", `Specify the file to write the folder structure to. Defaults to ${DEFAULTS.fstructFile}.`, DEFAULTS.fstructFile);