import { FstructException } from "../../exception/exceptions";
import { readConfigFile } from "./config-file-reader";

export interface FStructConfig {
    debug: boolean;
    variables: Record<string, string>;
}

export const fstructVariableRegex = /\$[a-zA-Z0-9_]+/;

let config: FStructConfig;

export async function initConfig(configFile: string) {
    config = await readConfigFile(configFile);
}

export function getConfig(): FStructConfig {
    if (!config) {
        throw new FstructException('Config not initialized');
    }

    return config;
}