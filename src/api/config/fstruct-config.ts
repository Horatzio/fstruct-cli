export interface FStructConfig {
    debug: boolean;
    variables: Record<string, string>;
}

export const fstructVariableRegex = /\$[a-zA-Z0-9_]+/;