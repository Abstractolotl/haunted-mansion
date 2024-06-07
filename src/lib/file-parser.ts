export class FileParser {

    public static parse(file: string): string[][] {
        return file.split('\n')
            .map(row => row.split(''))
            .reverse();
    }

}