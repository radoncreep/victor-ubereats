import BaseImageService, { 
    ProcessedImage, 
    UnprocessedImage, 
    ImageProcessor, 
    ImageStorage 
} from "./BaseImageService";
import { AppImageProcessor } from "./ImageProcessor";
import CloudinaryImageStorage from "./ImageStorage";


export default class ImageService extends BaseImageService {
    constructor(
        private storage: ImageStorage, 
        private processor: ImageProcessor | null
    ) {
        super();
    }
    
    public async save(image: UnprocessedImage) {
        return this.storage.upload(image);
    }
}
