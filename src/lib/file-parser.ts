import * as fileSystem from 'fs';

export class FileParser {

    public static parseFromFile(filePath: string): string[][] {
        return this.parse(fileSystem.readFileSync('example.txt', {
            encoding: 'utf-8',
        }));
    }

    public static parse(file: string): string[][] {
        return file.split('\n').map(row => row.split(''));
    }

}