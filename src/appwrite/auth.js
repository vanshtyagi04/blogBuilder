import conf from "../conf/config";
import { Client , Account , ID} from "appwrite"

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client.setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email , password , name}) {
        try {
            let userAccount = await this.account.create(ID.unique() , email , password , name);
            if(userAccount){
                return this.login({email, password});
            }
            else{
                return userAccount
            }
        }
        catch(error){
            throw error
        }
    }
    async login({email , password}){
        try{
            return await this.account.createEmailPasswordSession(email , password);
        }
        catch(error){
            throw error
        }
    }

    async getCurrentUser() {
        try{
            let requiredAccount =  await this.account.get()
            if(requiredAccount){
                return requiredAccount;
            }
            else{
                return requiredAccount;
            }
        }
        catch(error){
            throw error
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(error){
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;