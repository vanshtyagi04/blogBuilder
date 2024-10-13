import conf from "../conf/config";
import { Client ,ID ,Storage,} from "appwrite"

export class File{
    client = new Client();
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.bucket = new Storage(conf.appwriteBucketId);
    }
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        }
        catch(error){
            console.log("Error :: Appwrite :: File :: uploadFile");
            console.log(error);
        }
        
    }
    
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        }
        catch(error){
            console.log("Error :: Appwrite :: File :: uploadFile");
            console.log(error);
            return false;
        }
    }

    async getFilePreview(fileId){
        return this.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const file = new File();
export default file;