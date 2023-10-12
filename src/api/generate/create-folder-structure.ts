import { FolderStructure } from "../model/folder-structure";
import * as path from 'path';
import { isLink, getLinkParts } from "./link-parsing";
import * as fs from 'fs-extra';
import * as micromatch from 'micromatch';
import { trimQuotes } from "../util/string-trimmer";

export async function createFolderStructure(rootDir: string, folderStructure: FolderStructure) {
    const symLinkQueue = [];
    await processFolderStructure(folderStructure, rootDir);

    for(const link of symLinkQueue) {
        await fs.ensureSymlink(link.target, link.path)
    }

    async function processFolderStructure(folderStructure: FolderStructure, currentDir: string) {
        const currentFolder = trimQuotes(Object.keys(folderStructure)[0]);
        if (isLink(currentFolder)) {
            await processLinkFolder(folderStructure, currentDir);
            return;
        }

        const parentFolderDir = path.join(currentDir, currentFolder)
        await fs.ensureDir(parentFolderDir);

        const contents = folderStructure[currentFolder];
        for(const unsanitizedEntry of contents) {
            const entry = trimQuotes(unsanitizedEntry);
            if (typeof entry === 'string') {
                if (isLink(entry)) {
                    const linkParts = getLinkParts(entry);
                    const entryPath = path.join(parentFolderDir, linkParts.entryName);
                    symLinkQueue.push({
                        path: entryPath,
                        target: path.join(parentFolderDir, linkParts.linkTarget),
                    });
                } else {
                    const entryPath = path.join(parentFolderDir, entry);
                    await fs.ensureFile(entryPath);
                }
            } else {
                await processFolderStructure(entry, parentFolderDir);
            }
        }
    }

    async function processLinkFolder(linkFolderStructure: FolderStructure, currentDir: string) {
        const folderName = trimQuotes(Object.keys(linkFolderStructure)[0]);
        const linkParts = getLinkParts(folderName);

        const contents = linkFolderStructure[folderName];
        if (contents.length == 0) {
            const linkPath = path.join(currentDir, linkParts.entryName);
            symLinkQueue.push({
                path: linkPath,
                target: linkParts.linkTarget,
            });
            return;
        } else {
            const folderPath = path.join(currentDir, linkParts.entryName);
            await fs.ensureDir(folderPath);

            const fileExpressions = [];
            for(const entry of contents) {
                if (typeof entry === 'string') {
                    fileExpressions.push(entry);
                } else {
                    await processFolderStructure(entry, folderPath);
                }
            }

            const fileExpression = fileExpressions.map(e => `(${e})`).join('|');
            const linkTarget = path.join(currentDir, linkParts.linkTarget);

            const files = await fs.readdir(linkTarget);

            const foundFiles = files.filter(f =>  micromatch.isMatch(f, fileExpression));
            for(const foundFile of foundFiles) {
                const foundFilePath = path.join(linkTarget, foundFile);
                const linkPath = path.join(folderPath, foundFile);
                symLinkQueue.push({
                    path: linkPath,
                    target: foundFilePath,
                });
            }
        }
    }
}