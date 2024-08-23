export default class TextHelper {

    public static splitTextToLines(text: string, maxLength: number): string[] {
        if (maxLength < 1) {
            throw new Error("maxLength must be greater than 0");
        }

        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        const addLine = (line: string) => {
            if (line) {
                lines.push(line);
            }
        };

        for (let word of words) {
            if ((currentLine.length + word.length + (currentLine ? 1 : 0)) <= maxLength) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                if (word.length > maxLength) {
                    addLine(currentLine);
                    currentLine = '';

                    while (word.length > maxLength) {
                        const part = word.slice(0, maxLength);
                        lines.push(part);
                        word = word.slice(maxLength);
                    }

                    currentLine = word;
                } else {
                    addLine(currentLine);
                    currentLine = word;
                }
            }
        }

        addLine(currentLine);

        return lines;
    }

}