import { writeFileSync, existsSync, mkdirSync } from "fs";
import { generateRandomImageBufferBruteForce, GenerateOptions } from "../src/generate"
import fetch from "node-fetch";

const containerName = "generated"
const generateImageCode = "REPLACE_ME";
const generateSasCode = "REPLACE_ME";

const testSet: GenerateOptions[] =
    ["TIFF", "PNG", "JPEG"].map((fileType: "PNG" | "JPEG" | "TIFF") => {
        return Array.apply(0, Array(100)).map((val, index) => {
            const sizeInMb = index+1;
            const sizeTargetInBytes = sizeInMb * 1024 * 1024;
            const pixelSize = 4;
            const pixels = sizeTargetInBytes / pixelSize;
            const squareRoot = Math.ceil(Math.sqrt(pixels));

            const testSetFile: GenerateOptions = {
                fileType: fileType,
                incrementOptions: {
                    startingHeight: squareRoot,
                    startingWidth: squareRoot,
                    targetLengthMB: sizeInMb
                }
            };

            console.log(`This test will generate an '${fileType}' image of size target ${sizeInMb} roughly ${squareRoot}x${squareRoot}`)
            return testSetFile;
        })
    })
        .reduce((prev: GenerateOptions[], cur: GenerateOptions[]) => {
            return prev.concat(cur);
        });


const getWriteSas = async (containerName: string, blobName: string): Promise<string> => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            containerName,
            blobName,
            "expiryInHours": 5
        })
    };

    return fetch(`https://sls-weur-dev-generate-sas-node.azurewebsites.net/api/v1/generate-sas/write?code=${generateSasCode}`, requestOptions)
        .then(response => {
            if (response.status != 200) {
                console.log("Could not get SAS token. reason: " + response.statusText);
                throw "error";
            }

            return response.json();
        })
        .then(json => {
            console.log("Generated SAS Token: " + json.sasUrl);
            return json.sasUrl;
        });
}

const getSasFileLength = async (sas: string): Promise<number> => {
    const requestOptions = {
        method: "HEAD"
    };

    return fetch(sas, requestOptions)
        .then(response => {

            if (response.status != 200) {
                return 0;
            }

            console.log("Got " + response.status + " content length: '" + response.headers.get("Content-Length") + "'");
            return parseInt(response.headers.get("Content-Length"));
        });
}

const generateWithAzure = async (sas: string, testSetFile: GenerateOptions): Promise<string> => {
    var raw = JSON.stringify({
        "OutputPutUrl": sas,
        "OutputPutUrlRequestHeaders":
        {
            "x-ms-blob-type": "BlockBlob"
        },
        ...testSetFile
    });

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: raw
    };

    return fetch(`http://sls-weur-dev-generate-image-http-trigger.azurewebsites.net/api/v1/generate/image/to-url?code=${generateImageCode}`, requestOptions)
        .then(response => {
            console.log("Got " + response.status);

            if (response.status != 200) {
                console.log("Could not get SAS token. reason: " + response.statusText);
                throw "error";
            }

            return response.text();
        });
}

const generateImages = async () => {
    for (let i = 0; i < testSet.length; i++) {
        const testSetFile = testSet[i];
        const fileType = testSetFile.fileType;

        const blobName = `testfiles/${fileType}/~${testSetFile.incrementOptions.targetLengthMB.toString().padStart(5, "0")}MB.${fileType.toLowerCase()}`;
        console.log(`Generating sas for 'generated' container with blob '${blobName}'`);
        const sas = await getWriteSas("generated", blobName);

        const fileLength = await getSasFileLength(sas)

        if (fileLength > 0) {
            console.log(`'${blobName}' already exists, skipping...`);
            continue;
        }

        console.log(`Generating ${fileType} image of size ${testSetFile.incrementOptions.targetLengthMB}MB to container 'generated' blobName '${blobName}' to ${sas}`);
        const etag = await generateWithAzure(sas, testSetFile);
        console.log(`Generated ${fileType} image of size ${testSetFile.incrementOptions.targetLengthMB}MB to container 'generated' blobName '${blobName}' etag '${etag}'`);
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