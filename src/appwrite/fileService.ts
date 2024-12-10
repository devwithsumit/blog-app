import { Client, ID, Storage } from "appwrite";
import config from "../config/config";

export class FileService {
    client = new Client();
    storage; // create a storage var for further use
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appWriteProjectId);
        this.storage = new Storage(this.client); // create storage
    }

    async uploadFile(file: File) {
        try {
            return await this.storage.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file,
            );
        } catch (error) {
            console.log("Appwrite :: uploadFile :: error :", error);
        }
    }
    async deleteFile(fileId: string) {
        try {
            await this.storage.deleteFile(
                config.appWriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("Appwrite :: deleteFile :: error :", error);
        }
    }
    getFilePreview(fileId : string){
        try {
            return this.storage.getFilePreview(
                config.appWriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite :: getFilePreview :: error :", error);
        }
    }
}

const fileService = new FileService();
export default fileService;