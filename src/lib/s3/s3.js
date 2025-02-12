import { variablesS3 } from "../../utils/params/const.database.js";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { Sha256 } from "@aws-crypto/sha256-browser";
import { Hash } from "@aws-sdk/hash-node";
import AWS from "aws-sdk";

async function extractRegionFile(url) {
    const regex = /https?:\/\/([^.]+)\.s3\.([a-z0-9-]+)\.amazonaws\.com(?:\/[^\/]+)*\/([^\/]+)$/;
    const match = url.match(regex);

    if (match) {
        return { bucket: match[1], region: match[2], archivo: match[3] };
    }
    return { bucket: null, region: null, archivo: null };
}

export async function generateURLsignature(url) {
    try {

        // Configura tus credenciales de AWS
        AWS.config.update({
            accessKeyId: variablesS3.access_key,
            secretAccessKey: variablesS3.secret_key,
            region: variablesS3.region
        });

        const s3 = new AWS.S3();

        const params = {
            Bucket: 'landing-page-d10', // Reemplaza con el nombre de tu bucket
            Key: 'images/Web+6.jpg', // Reemplaza con la ruta al objeto en S3
            Expires: 3600 // Opcional: tiempo de expiración de la URL en segundos (por defecto es 15 minutos)
        };

        const signedUrl = s3.getSignedUrl('getObject', params);

        // console.log(signedUrl);

        // const signedUrl = s3.getSignedUrl('getObject', params);

        // console.log(signedUrl);

        // const testUrl = "https://landing-page-d10.s3.sa-east-1.amazonaws.com/images/Web+6.jpg";

        // const { bucket, region, archivo } = await extractRegionFile(url)

        // let expirationTime = 60 * 5;

        // const signer = new S3RequestPresigner({
        //     region: region,
        //     credentials: {
        //         accessKeyId: variablesS3.access_key,
        //         secretAccessKey: variablesS3.secret_key,
        //     },
        //     sha256: Hash.bind(null, "sha256"),
        // });

        // const params = {
        //     Bucket: "landing-page-d10",
        //     Key: "images/Web+6.jpg",
        //     Expires: expirationTime,
        //     // ContentType: 'application/octet-stream',
        // };

        // const credentials = {
        //     accessKeyId: variablesS3.access_key,
        //     secretAccessKey: variablesS3.secret_key
        // }

        // // const sha256 = Hash.bind(null, "sha256")

        // const presigned = await signer.presign(params);

        // return presigned;
    } catch (error) {
        console.log(error)
    }
};

