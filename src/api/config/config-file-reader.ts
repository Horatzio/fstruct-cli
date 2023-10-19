import { FStructConfig, fstructVariableRegex } from "./fstruct-config";
import * as path from 'path';
import * as fs from 'fs-extra';
import * as yaml from 'yaml';
import { isValidPathString } from "../util/path-sanitization";
import { validateYmlFileExists } from "../../commands/option-validator";

const DEFAULTS: FStructConfig = {
    debug: false,
    variables: {}
}

function validateConfig(configContents: any): Partial<FStructConfig> {
    const config: Partial<FStructConfig> = {};

    if (typeof configContents !== 'object') {
        return config;
    }

    if (typeof configContents.debug === 'boolean') {
        config.debug = configContents.debug;
    };

    if (typeof configContents.variables === 'object') {
        const variables = configContents.variables;
        config.variables = Object.keys(variables).reduce((acc, key) => { 
            if (typeof variables[key] === 'string' && fstructVariableRegex.test(key) && isValidPathString(variables[key])) {
                acc[key] = variables[key];
            }
            return acc;
        }, {});
    }

    return config;
}

export async function readConfigFile(configFile: string): Promise<FStructConfig> {
    const rootDir = process.cwd();
    const filePath = path.join(rootDir, configFile);
    if (!(await fs.exists(filePath))) {
        return DEFAULTS;
    }

    await validateYmlFileExists(filePath);

    const fileContent = await fs.readFile(filePath, 'utf-8');
    const config = validateConfig(yaml.parse(fileContent));

    return {
        ...DEFAULTS,
        ...config
    }
}