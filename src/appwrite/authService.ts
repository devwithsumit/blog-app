import config from "../config/config";
import { Client, Account, ID } from "appwrite";

interface User{
    email : string,
    password : string,
    name? : string,
}
class AuthService {
    client = new Client(); //client
    account; // account var for further use account service
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl) //connect to appwrite
            .setProject(config.appWriteProjectId); // connect to appwrite project
        this.account = new Account(this.client); // create an admin account
    }
    //create Account
    async createAccount({email, password, name} : User){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //call another method
                return this.login({email, password});
            }else{
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite :: createAccount :: error : ", error);
        }
    }

    async login({email, password} : User){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite :: login :: error : ", error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite :: getCurrentUser : error : ", error);
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(error){
            console.log("Appwrite :: logout :: error : ", error);
        }
    }
}

const authService = new AuthService()

export default authService;