import conf from "../conf/config";
import { Client , Account , ID} from "appwrite"

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
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
            console.log("Error :: Appwrite :: AuthService :: createUser");
            console.log(error);
        }
    }
    async login({email , password}){
        try{
            return await this.account.createEmailPasswordSession(email , password);
        }
        catch(error){
            console.log("Error :: Appwrite :: AuthService :: login");
            console.log(error);
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
            console.log("Error :: Appwrite :: AuthService :: getCurrentUser");
            console.log(error);
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(error){
            console.log("Error :: Appwrite :: AuthService :: logout");
            console.log(error);
        }
    }
}

const authService = new AuthService();

export default authService;