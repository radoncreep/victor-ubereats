import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

import { ImageStorage, ImageStorageResponse, UnprocessedImage } from "./BaseImageService";
import { ServerError } from '../../error/server.error';


export default class CloudinaryImageStorage implements ImageStorage { 
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    }

    public async upload(image: UnprocessedImage) {
        const width = 300;
        const height = 150;

        try {
            const result: UploadApiResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        // generate random public id
                        transformation: [
                            {width, height},
                            {width: width + 100, height: height + 50}
                        ],
                        resource_type: "raw",
                        filename_override: image.name,
                        folder: image.folder
                    },
                    function(error, result) {
                        if (error) reject(error);

                        resolve(result);
                    }
                ).end(image.buffer);
            });
    
            return { id: result.public_id, url: result.secure_url };
        } catch (error) {
            throw new ServerError(
                "Server Error: Image upload failed.",
                error instanceof Error ? error.message : null
            );
        }
    }

    public async delete(id: string): Promise<void> {
        const result = await cloudinary.uploader.destroy(
            'sample', 
            {
                resource_type: "image"
            }
        )
    }

    public get(id: string): ImageStorageResponse {
        throw new Error("Method not implemented.");
    }

    public update(id: string): ImageStorageResponse {
        throw new Error("Method not implemented.");
    }
}