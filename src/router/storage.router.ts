import  {Router} from "express"
import { downloadaFile , uploadFile } from "../controller/storage.controller"
const StorageRouter  = Router()

StorageRouter.post("/download", downloadaFile)
StorageRouter.post("/upload", uploadFile)

export default StorageRouter