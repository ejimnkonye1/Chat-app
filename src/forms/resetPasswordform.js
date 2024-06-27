
import { auth } from "../Firebase";

export  const handlePasswordReset = async (email) => {
    
    try{
        await auth.sendPasswordResetEmail(email);
        return{
            success: true, message: 'go back to get your password'
        }
    } catch (err){
            return {
                success: false, message: err.message
            }
    }



    
  
}