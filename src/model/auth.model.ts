import {CallbackWithoutResultAndOptionalError, Schema , model} from 'mongoose'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

const authSchema = new Schema ({
      image:{
          type: String,
          default : null  
      },
      fullname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique:true
      },
      mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
        trim: true
      },
      refreshToken: {
        type: String
      },
      expiry:{
         type: Date
      }
},{timestamps: true})

// authSchema.pre('save', async function() {
//   this.password = await bcrypt.hash(this.password.toString(), 12)
//   this.refreshToken = uuid()
//   this.expiry = moment().add(7, 'days').toDate()
// })

authSchema.pre('save',  async function(next){
  this.password = await bcrypt.hash(this.password.toString(),12)
 // next()
})

authSchema.pre('save', function(next){
   this.refreshToken = null
   this.expiry = null
  // next()
})

const AuthModel = model('Auth', authSchema)
export default AuthModel

// import { Schema, model, Document } from 'mongoose'
// import bcrypt from 'bcrypt'
// import { v4 as uuid } from 'uuid'
// import moment from 'moment'

// interface IAuth extends Document {
//   image: string | null
//   fullname: string
//   email: string
//   mobile: string
//   password: string
//   refreshToken: string
//   expiry: Date
// }

// const authSchema = new Schema<IAuth>({
//   image: { type: String, default: null },
//   fullname: { type: String, required: true, lowercase: true, trim: true },
//   email: { type: String, required: true, trim: true, unique: true },
//   mobile: { type: String, required: true, trim: true, unique: true },
//   password: { type: String, required: true, trim: true },
//   refreshToken: { type: String },
//   expiry: { type: Date }
// }, { timestamps: true })

// // ✅ next nahi — async khud handle karta hai
// authSchema.pre('save', async function() {
//   this.password = await bcrypt.hash(this.password.toString(), 12)
//   this.refreshToken = uuid()
//   this.expiry = moment().add(7, 'days').toDate()
// })

// const AuthModel = model<IAuth>('Auth', authSchema)
// export default AuthModel