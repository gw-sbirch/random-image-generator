const MBInGB = 1024;

/* eslint-disable @typescript-eslint/no-explicit-any */
import appInsights = require("applicationinsights");
// appInsights.setup("1579dfe9-8ae1-4f36-a6be-baf178778cb2");
appInsights.setup("<instrumentation_key>");
appInsights.start();
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { generateRandomImageBufferBruteForce } from "../generate";
import fetch from "node-fetch";

const getModelValidationErrors = (body: any): any => {
    const errors = {};

    if (!body) {
        errors["body"] = "Was not supplied";
        return errors;
    }

    if (!body.OutputPutUrl) {
        errors["OutputPutUrl"] = "Was not supplied";
    }

    if (!body.incrementOptions) {
        errors["incrementOptions"] = "Was not supplied";
    }

    if (!body.incrementOptions.targetLengthMB) {
        errors["incrementOptions.targetLengthMB"] = "Was not supplied";
    }

    if (body.incrementOptions.targetLengthMB > (MBInGB * 2)) {
        errors["incrementOptions.targetLengthMB"] = "Cannot be larger than 2GB";
    }

    if (!body.fileType) {
        errors["fileType"] = "Was not supplied";
    }
    else if (!["TIFF", "PNG", "JPEG"].includes(body.fileType.toUpperCase())) {
        errors["fileType"] = "is not a valid type";
    }

    return errors;
};

const uploadFile = async (fileUrl: string, headers: { [header: string]: string }, buf: Buffer): Promise<string> => {
    const response = await fetch(fileUrl, {
        method: "PUT",
        body: buf,
        headers
    });

    if (!response.ok) {
        throw response.statusText;
    }

    const etag = response.headers.get("etag");

    if (!etag) {
        return "\"\"";
    }

    return etag;
};

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    context.log("HTTP trigger function processed a request.");

    const errors = getModelValidationErrors(req.body);

    if (Object.keys(errors).length) {
        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                errors
            }
        };
    }

    try {
        const imageBuffer = await generateRandomImageBufferBruteForce({
            ...req.body
        });

        console.log("Uploading to " + req.body.OutputPutUrl);
        const etag = await uploadFile(req.body.OutputPutUrl, req.body.OutputPutUrlRequestHeaders, imageBuffer);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            }, 
            body: etag
        };
    }
    catch (err) {
        context.log(err);
        return {
            statusCode: 500,
            body: err
        };
    }
};

export default httpTrigger;