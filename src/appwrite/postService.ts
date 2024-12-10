import config from "../config/config";
import { Client, Databases, Query } from "appwrite";

interface Post {
    title: string;
    slug: string;
    content: string;
    featuredImage: string;
    status: string;
    userId?: string; // Optional if not always provided
}
export class PostService {
    client = new Client();
    databases;
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appWriteProjectId);
        this.databases = new Databases(this.client); // create the database
    }
    // create post and save it in DB
    async createPost({ slug, title, content, featuredImage, status, userId }: Post) {
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite :: createPost :: error : ", error);
        }
    }
    async updatePost(slug: string, { title, content, featuredImage, status }: Post) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite :: updatePost :: error : ", error);
        }
    }
    async deletePost(slug: string) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite :: createPost :: error : ", error);
            return false
        }
    }
    async getPost(slug: string) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId, // databaseId
                config.appWriteCollectionId, // collectionId
                slug, // documentId
                [] // queries (optional)
            )
        } catch (error) {
            console.log("Appwrite :: getPost :: error : ", error)
        }
    }
    async getAllPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite :: getPosts :: error :", error);
            return false;
        }
    }
}
const postService = new PostService();
export default postService;