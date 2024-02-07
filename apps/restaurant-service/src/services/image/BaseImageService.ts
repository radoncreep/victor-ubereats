import { DbImage } from "../../schema/restaurant";

export type ImageStorageResponse = Promise<{
    id: string;
    url: string;
}>;

export interface ImageStorage {
    upload(image: UnprocessedImage): ImageStorageResponse;
    delete(id: string): Promise<void>;
    get(id: string): ImageStorageResponse;
    update(id: string, image: FormData): ImageStorageResponse;
}

export interface ImageProcessor {
    resize(): void;
    crop(): void;
    process(): void;
}

export interface UnprocessedImage {
    name: string;
    mimetype: string;
    buffer: Buffer;
    size?: number;
    type: "thumbnail" | "main" | "featured";
    folder: string;
}

export interface ProcessedImage extends Omit<DbImage, "url" | "id"> {
    width: number;
    height: number;
}


export default abstract class BaseImageService {
    // protected process(image: UnprocessedImage): Promise<ProcessedImage> 

    // public async save(image: UnprocessedImage): Promise<DbImage> {
    //     const processedImage = await this.process(image);
    //     return await this.saveImage(processedImage);
    // }

      
    // protected abstract saveImage(image: ProcessedImage): Promise<DbImage>;

    // protected abstract updateImage(id, image: Image): Promise<void>;

    // protected abstract deleteImage(id: string): Promise<void>;

    // protected abstract getImage(id: string): Promise<Image>;

    public abstract save(image: UnprocessedImage): ImageStorageResponse;

}