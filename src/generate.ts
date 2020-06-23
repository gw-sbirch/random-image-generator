import sharp = require("sharp");

const BytesInKiloBytes = 1024;
const BytesInMB = BytesInKiloBytes * 1024;

export type FileTypeCallback = (img: sharp.Sharp) => sharp.Sharp;
export type IncrementOptions = {
    startingHeight?: number;
    startingWidth?: number;
    startingIncrementPixels?: number;
    targetLengthMB?: number;
};

export type GenerateOptions = {
    // TODO: look at a way of linking callback to type stronger
    fileType: "PNG" | "JPEG" | "SVG" | "TIFF";
    fileTypeCallback?: FileTypeCallback;
    incrementOptions?: IncrementOptions;
};

const createRandomImageBuffer = async (height: number, width: number, fileTypeCallback: FileTypeCallback): Promise<Buffer> => {
    let frameData = Buffer.alloc(width * height * 4);
    let i = 0;

    while (i < frameData.length) {
        frameData[i++] = Math.floor(Math.random() * 256);
    }

    return fileTypeCallback(sharp(frameData, {
        raw: {
            height: height,
            width: width,
            channels: 4
        },
        limitInputPixels: false
    })).toBuffer();
}

/** default options increment at about 1MB for PNG */
export const DefaultIncrementOptions = {
    startingHeight: 200,
    startingWidth: 200,
    startingIncrementPixels: 100,
    targetLengthMB: 1
};

export const DefaultFileTypeCallback: FileTypeCallback = (img) => img.png();

export const DefaultOptions: GenerateOptions = {
    fileType: "PNG",
    fileTypeCallback: DefaultFileTypeCallback,
    incrementOptions: DefaultIncrementOptions
}

export const generateRandomImageBufferBruteForce = async (options?: GenerateOptions): Promise<Buffer> => {
    if (!options) {
        options = DefaultOptions;
    }

    if (!options.fileTypeCallback) {
        options.fileTypeCallback = DefaultOptions.fileTypeCallback;
    }

    if (!options.incrementOptions) {
        options.incrementOptions = DefaultOptions.incrementOptions;
    }

    const targetLength = BytesInMB * options.incrementOptions.targetLengthMB;
    let lastWidth = options.incrementOptions.startingWidth ?? DefaultIncrementOptions.startingWidth;
    let lastHeight = options.incrementOptions.startingHeight ?? DefaultIncrementOptions.startingHeight;
    let pixelIncrement = options.incrementOptions.startingIncrementPixels ?? DefaultIncrementOptions.startingIncrementPixels;
    let fileTypeCallback = options.fileTypeCallback ?? DefaultOptions.fileTypeCallback;

    while (true) {
        const currentHeight = lastHeight;
        const currentWidth = lastWidth;

        const buf = await createRandomImageBuffer(currentHeight, currentWidth, fileTypeCallback);

        if (buf.length <= (targetLength - (BytesInMB / 4))) {
            lastHeight += pixelIncrement;
            lastWidth += pixelIncrement;

            console.log(`${new Date().toTimeString()} ${options.fileType}: Target ${options.incrementOptions.targetLengthMB}MB ` +
                `Actual ${(buf.length / BytesInMB).toFixed(2)}MB - ${currentHeight}x${currentWidth} needs ${((targetLength - buf.length) / BytesInMB).toFixed(2)}MB, ` +
                `changing h/w +${pixelIncrement} to ${lastWidth}x${lastHeight}...`);
        }
        else if (buf.length >= (targetLength + (BytesInMB / 4))) {
            if (pixelIncrement > 10) {
                pixelIncrement = Math.ceil(pixelIncrement / 2);
            } else {
                pixelIncrement = 10;
            }
            
            lastHeight -= pixelIncrement;
            lastWidth -= pixelIncrement;

            console.log(`${new Date().toTimeString()} ${options.fileType}: Target ${options.incrementOptions.targetLengthMB}MB ` +
                `Actual ${(buf.length / BytesInMB).toFixed(2)}MB - ${currentHeight}x${currentWidth} needs ${((targetLength - buf.length) / BytesInMB).toFixed(2)}MB, ` +
                `changing h/w -${pixelIncrement} to ${lastWidth}x${lastHeight}...`);
        } else {
            return buf;
        }
    }
}