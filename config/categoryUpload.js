import cloudinaryPackage from 'cloudinary';
import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';
import Category from '../model/Category';
const cloudinary = cloudinaryPackage.v2;

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});
//create storage engine for multer
const storage = new cloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg","png","jpeg"],
    params:{
        folder:"Ecommerce-api",

    },
});
const CategoryUpload= multer({
    storage,
});
export default CategoryUpload;