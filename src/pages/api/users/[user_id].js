import connectDB from '@backend/index'
import * as controller from '@backend/controllers/user.controller'

const route = async (req, res) => {
    try{
        await connectDB()
        if(req.method === "GET"){
            await controller.getUser(req,res)
        }
        else if(req.method === "PUT"){
            await controller.updateUser(req,res)
        }
        else if(req.method === "DELETE"){
            await controller.deleteUser(req,res)
        }
        else{
            return res.status(405).json({msg:"Method Not Allowed"})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

export default route