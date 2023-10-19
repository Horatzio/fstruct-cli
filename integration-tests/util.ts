import { spawn } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';

const cliPath = join(__dirname, '..', 'dist', 'fstruct.js');
export const runCli = async (args: string[]) => {
    const childProcess = spawn('node', [cliPath, ...args]);
    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];

    childProcess.stdout.on('data', (chunk) => {
        stdoutChunks.push(chunk);
    });

    childProcess.stderr.on('data', (chunk) => {
        stderrChunks.push(chunk);
    });

    await promisify(childProcess.on.bind(childProcess))('exit');

    const stdout = Buffer.concat(stdoutChunks).toString().trim();
    const stderr = Buffer.concat(stderrChunks).toString().trim();

    return { stdout, stderr };
};
