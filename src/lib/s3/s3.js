import { variablesS3 } from "../../utils/params/const.database.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import crypto from "crypto";
import path from "path";

// Configuración de AWS S3
const s3Client = new S3Client({
    region: variablesS3.region,
    credentials: {
        accessKeyId: variablesS3.access_key,
        secretAccessKey: variablesS3.secret_key
    }
});

// Configuración de Multer para almacenamiento temporal
const storage = multer.memoryStorage();
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limitar a 5MB
    }
});

// Middleware para procesar errores de Multer
export const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({ error: 'El archivo excede el tamaño máximo permitido (5MB)' });
        }
        return res.status(400).json({ error: err.message });
    }
    next(err);
};

// Función para generar un nombre de archivo único
const generateUniqueFileName = (originalName) => {
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(8).toString('hex');
    const extension = path.extname(originalName);
    return `${timestamp}-${randomString}${extension}`;
};

// Función para obtener el bucket dinámico según el parámetro `page`
const getBucketName = (page) => {
    if (page === 'academy') return variablesS3.bucketAcademy;
    if (page === 'landing') return variablesS3.bucketLanding;
    return null;
};

// Función para determinar la carpeta según el tipo de archivo
const getFileCategory = (mimetype) => {
    if (mimetype.startsWith('image/')) return 'images';
    if (mimetype.startsWith('video/')) return 'videos';
    if (mimetype.includes('svg') || mimetype.includes('icon')) return 'icons';
    return null;
};

// Controlador para subir archivos a S3
export const uploadFileS3 = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
        }

        const { page } = req.body; // Se obtiene el parámetro `page`
        const bucketName = getBucketName(page);
        if (!bucketName) {
            return res.status(400).json({ error: "Parámetro 'page' inválido. Debe ser 'academy' o 'landing'." });
        }

        const fileCategory = getFileCategory(req.file.mimetype);
        if (!fileCategory) {
            return res.status(400).json({ error: "Tipo de archivo no soportado. Solo se permiten imágenes, videos e iconos." });
        }

        const uniqueFileName = generateUniqueFileName(req.file.originalname);
        const objectKey = `${fileCategory}/${uniqueFileName}`;

        // Configuración para subir a S3
        const bucketParams = {
            Bucket: bucketName,
            Key: objectKey,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };

        // Subir archivo a S3
        const command = new PutObjectCommand(bucketParams);
        await s3Client.send(command);

        // Generar URL del archivo
        const fileUrl = `https://${bucketName}.s3.${variablesS3.region}.amazonaws.com/${objectKey}`;

        res.status(200).json({
            message: 'Archivo subido exitosamente',
            fileUrl: fileUrl,
            fileName: uniqueFileName
        });
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        res.status(500).json({ error: 'Error al subir el archivo a S3', msg: error.message });
    }
};