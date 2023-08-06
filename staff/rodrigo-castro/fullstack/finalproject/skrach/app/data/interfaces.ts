import { Document, Model, Schema } from 'mongoose'

const { Types: { ObjectId } } = Schema

interface IUser {
  name: string
  email: string
  password: string
  avatar?: string
  projects: typeof ObjectId[]
}

interface IPost {
  author: string
  image: string
  text: string
  date: Date
  likedBy?: string[]
  privacy: string
}

export interface UserModel extends IUser, Document {}
export interface PostModel extends IPost, Document {}