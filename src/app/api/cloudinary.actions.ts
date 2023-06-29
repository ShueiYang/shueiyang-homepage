import { v2 as cloudinary } from "cloudinary";

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


export async function uploadImage(image: string, projectName: string) {
    try {
        const result = await cloudinary.uploader.upload(image , {

            folder: `api/portfolio/${projectName}`,
            use_filename: true,
            unique_filename: false,
        });
        const { public_id, secure_url } = result;
        return {
            public_id,
            secure_url
        };
    } catch (err) {
        throw err;
    }
}   