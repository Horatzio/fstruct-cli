#!/usr/bin/env node

"use strict";

// TypeScript (.ts)
import { Command } from 'commander';
import { DEFAULTS } from './config';
import { commands } from './commands';
export const program = new Command();

const { version } = require("../../package.json");

program
    .name("fstruct")
    .description("A CLI tool for generating folder structures.")
    .addHelpText("beforeAll", "Display help for commands.")
    .version(version, "-v, --version")
    .option("-c, --config <config>", `Specify a config file to use. Defaults to ${DEFAULTS.configFile}.`, undefined, DEFAULTS.configFile)


for (const command of commands) {
    program.addCommand(command);
}

async function main() {
    await program.parseAsync(process.argv);
}

console.log();
main();

process.on('unhandledRejection', function (err: Error) {
    console.error(err.stack);
    program.error('', { exitCode: 1 });
});