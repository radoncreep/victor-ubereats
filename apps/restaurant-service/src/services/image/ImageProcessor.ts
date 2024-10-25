import {ConfigOptions, UploadApiOptions, v2 as cloudinary} from 'cloudinary';
import { ImageProcessor, ProcessedImage, UnprocessedImage } from "./BaseImageService";


/**  
 * define the dimensions for different types of images (thumbnails, bg_images, banners, ad images)
 * extract or define the meta data (filename, format, owner information)
 * for example, this guy processes it and tells the storage, I've processed all the information required 
 * and you need right? so store this for me
 * 
 * key things are resizing (dimensions), compression, thumbnail generation, image filtering (blur bg image)
 * tagging (meta data or image information), image format support (JPEG, PNG)
*/

type ImageDimension = {
    width: number;
    height: number;
}

type ImageConfig = {
    name: string;
    thumbnail: ImageDimension;
    background: ImageDimension;
}


export class AppImageProcessor implements ImageProcessor {
    private image: UnprocessedImage;

    process(): ProcessedImage {
        let width: number = 100;
        let height: number = 100;

        if (this.image.type === "main") {
            width = 300;
            height = 200;
        }
        return { name: this.image.name, width, height };
    }

    resize(): void {
       // defines the dimensions
    }

    crop(): void {
       // 
    }
}