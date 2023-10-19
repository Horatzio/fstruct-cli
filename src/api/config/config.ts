import { FstructException } from "../../exception/exceptions";
import { readConfigFile } from "./config-file-reader";
import { FStructConfig } from "./fstruct-config";

export let config: FStructConfig;
export async function initConfig(configFile: string) {
    config = await readConfigFile(configFile);
}

export function getConfig(): FStructConfig {
    if (!config) {
        throw new FstructException('Config not initialized');
    }

    return config;
}
