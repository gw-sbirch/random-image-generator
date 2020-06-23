import { writeFileSync, existsSync, mkdirSync } from "fs";
import { generateRandomImageBufferBruteForce, GenerateOptions } from "../src/generate"

const testSet: GenerateOptions[] =
    [
        //#region PNG
        {
            fileType: "PNG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 200,
                startingWidth: 200,
                startingIncrementPixels: 100,
                targetLengthMB: 1
            }
        },
        {
            fileType: "PNG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 600,
                startingWidth: 600,
                targetLengthMB: 2
            }
        },
        {
            fileType: "PNG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 800,
                startingWidth: 800,
                targetLengthMB: 3
            }
        },
        {
            fileType: "PNG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 1000,
                startingWidth: 1000,
                targetLengthMB: 4
            }
        },
        {
            fileType: "PNG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 5000,
                startingWidth: 5000,
                targetLengthMB: 100
            }
        },
        {
            fileType: "PNG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 7300,
                startingWidth: 7300,
                targetLengthMB: 200
            }
        },
        {
            fileType: "PNG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 8300,
                startingWidth: 8300,
                targetLengthMB: 300
            }
        },
        {
            fileType: "PNG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 10000,
                startingWidth: 10000,
                targetLengthMB: 400
            }
        },
        {
            fileType: "PNG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 12000,
                startingWidth: 12000,
                targetLengthMB: 500
            }
        },
        {
            fileType: "PNG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 13000,
                startingWidth: 13000,
                targetLengthMB: 600
            }
        },
        {
            fileType: "PNG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 12000,
                startingWidth: 12000,
                targetLengthMB: 700
            }
        },
        {
            fileType: "PNG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 14500,
                startingWidth: 14500,
                targetLengthMB: 800
            }
        },
        {
            fileType: "PNG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 15000,
                startingWidth: 15000,
                targetLengthMB: 900
            }
        },
        {
            fileType: "PNG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 15500,
                startingWidth: 15500,
                targetLengthMB: 1000
            }
        },



        //#region JPEG
        {
            fileType: "JPEG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 200,
                startingWidth: 200,
                startingIncrementPixels: 100,
                targetLengthMB: 1
            }
        },
        {
            fileType: "JPEG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 600,
                startingWidth: 600,
                targetLengthMB: 2
            }
        },
        {
            fileType: "JPEG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 800,
                startingWidth: 800,
                targetLengthMB: 3
            }
        },
        {
            fileType: "JPEG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 1000,
                startingWidth: 1000,
                targetLengthMB: 4
            }
        },
        {
            fileType: "JPEG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 5000,
                startingWidth: 5000,
                targetLengthMB: 100
            }
        },
        {
            fileType: "JPEG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 7300,
                startingWidth: 7300,
                targetLengthMB: 200
            }
        },
        {
            fileType: "JPEG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 8300,
                startingWidth: 8300,
                targetLengthMB: 300
            }
        },
        {
            fileType: "JPEG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 10000,
                startingWidth: 10000,
                targetLengthMB: 400
            }
        },
        {
            fileType: "JPEG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 12000,
                startingWidth: 12000,
                targetLengthMB: 500
            }
        },
        {
            fileType: "JPEG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 13000,
                startingWidth: 13000,
                targetLengthMB: 600
            }
        },
        {
            fileType: "JPEG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 12000,
                startingWidth: 12000,
                targetLengthMB: 700
            }
        },
        {
            fileType: "JPEG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 14500,
                startingWidth: 14500,
                targetLengthMB: 800
            }
        },
        {
            fileType: "JPEG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 15000,
                startingWidth: 15000,
                targetLengthMB: 900
            }
        },
        {
            fileType: "JPEG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 15500,
                startingWidth: 15500,
                targetLengthMB: 1000
            }
        },



        //#region TIFF
        {
            fileType: "TIFF",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 200,
                startingWidth: 200,
                startingIncrementPixels: 100,
                targetLengthMB: 1
            }
        },
        {
            fileType: "TIFF",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 600,
                startingWidth: 600,
                targetLengthMB: 2
            }
        },
        {
            fileType: "TIFF",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 800,
                startingWidth: 800,
                targetLengthMB: 3
            }
        },
        {
            fileType: "TIFF",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 1000,
                startingWidth: 1000,
                targetLengthMB: 4
            }
        },
        {
            fileType: "TIFF",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 5000,
                startingWidth: 5000,
                targetLengthMB: 100
            }
        },
        {
            fileType: "TIFF",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 7300,
                startingWidth: 7300,
                targetLengthMB: 200
            }
        },
        {
            fileType: "TIFF",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 8300,
                startingWidth: 8300,
                targetLengthMB: 300
            }
        },
        {
            fileType: "TIFF",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 10000,
                startingWidth: 10000,
                targetLengthMB: 400
            }
        },
        {
            fileType: "TIFF",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 12000,
                startingWidth: 12000,
                targetLengthMB: 500
            }
        },
        {
            fileType: "TIFF",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 13000,
                startingWidth: 13000,
                targetLengthMB: 600
            }
        },
        {
            fileType: "TIFF",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 12000,
                startingWidth: 12000,
                targetLengthMB: 700
            }
        },
        {
            fileType: "TIFF",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 14500,
                startingWidth: 14500,
                targetLengthMB: 800
            }
        },
        {
            fileType: "TIFF",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 15000,
                startingWidth: 15000,
                targetLengthMB: 900
            }
        },
        {
            fileType: "TIFF",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 15500,
                startingWidth: 15500,
                targetLengthMB: 1000
            }
        },


        //#region SVG
        {
            fileType: "SVG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 200,
                startingWidth: 200,
                startingIncrementPixels: 100,
                targetLengthMB: 1
            }
        },
        {
            fileType: "SVG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 600,
                startingWidth: 600,
                targetLengthMB: 2
            }
        },
        {
            fileType: "SVG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 800,
                startingWidth: 800,
                targetLengthMB: 3
            }
        },
        {
            fileType: "SVG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 1000,
                startingWidth: 1000,
                targetLengthMB: 4
            }
        },
        {
            fileType: "SVG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 5000,
                startingWidth: 5000,
                targetLengthMB: 100
            }
        },
        {
            fileType: "SVG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 7300,
                startingWidth: 7300,
                targetLengthMB: 200
            }
        },
        {
            fileType: "SVG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 8300,
                startingWidth: 8300,
                targetLengthMB: 300
            }
        },
        {
            fileType: "SVG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 10000,
                startingWidth: 10000,
                targetLengthMB: 400
            }
        },
        {
            fileType: "SVG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 12000,
                startingWidth: 12000,
                targetLengthMB: 500
            }
        },
        {
            fileType: "SVG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 13000,
                startingWidth: 13000,
                targetLengthMB: 600
            }
        },
        {
            fileType: "SVG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 12000,
                startingWidth: 12000,
                targetLengthMB: 700
            }
        },
        {
            fileType: "SVG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 14500,
                startingWidth: 14500,
                targetLengthMB: 800
            }
        },
        {
            fileType: "SVG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 15000,
                startingWidth: 15000,
                targetLengthMB: 900
            }
        },
        {
            fileType: "SVG",
            fileTypeCallback: (img) => img.png(),
            incrementOptions: {
                startingHeight: 15500,
                startingWidth: 15500,
                targetLengthMB: 1000
            }
        }
    ]


const generateImages = async () => {
    for (let i = 0; i < testSet.length; i++) {
        const testSetFile = testSet[i];
        const fileType = testSetFile.fileType;

        if (!existsSync("./testfiles")) {
            mkdirSync("./testfiles");
        }

        if (!existsSync("./testfiles/" + fileType)) {
            mkdirSync("./testfiles/" + fileType);
        }

        const filePath = `./testfiles/${fileType}/~${testSetFile.incrementOptions.targetLengthMB}MB.${fileType.toLowerCase()}`;

        if (existsSync(filePath))
        {
            console.log(`'${filePath}' already exists, skipping`);
            continue;
        }


        console.log(`Generating ${fileType} image of size ${testSetFile.incrementOptions.targetLengthMB}MB to ${filePath}`);
        writeFileSync(filePath, await generateRandomImageBufferBruteForce(testSetFile));
        console.log(`Generated ${fileType} of size ${testSetFile.incrementOptions.targetLengthMB} MB successfully to ${filePath}`);
    }
}

try {
    generateImages().then(() => {
        console.log("Finished!");
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        console.log("exiting...");
    });
}
catch (err) {
    console.log(err)
}