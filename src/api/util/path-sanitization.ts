import { fstructVariableRegex } from "../config/config";

const unixPathRegex = /^\/([a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+$/;
const windowsPathRegex = /^[a-zA-Z]:\\(((?![<>:"/\\|?*]).)+\\)*((?![<>:"/\\|?*]).)+$/;
const relativePathRegex = /^\.?\.?(\/[a-zA-Z0-9_-]+)+$/;
const globalFstructVariableRegex = new RegExp(fstructVariableRegex, 'g');

const variablePlaceholder = '__ENV_VAR__';
export function isValidPathString(pathString: string) {
    // Replace environment variable syntax with a placeholder in order to be accepted
    const pathWithPlaceholder = pathString.replace(globalFstructVariableRegex, variablePlaceholder);

    if (unixPathRegex.test(pathWithPlaceholder)) {
        return true;
    }
    
    if (windowsPathRegex.test(pathWithPlaceholder)) {
        return true;
    }
    
    if (relativePathRegex.test(pathWithPlaceholder)) {
        return true;
    }
    
    return false;
}