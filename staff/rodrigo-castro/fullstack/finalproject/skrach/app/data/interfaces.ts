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
  name: string
  date: Date
  owners: typeof ObjectId[]
  privacy: string
  tracks: string[]
  image: string
}

export interface UserModel extends IUser, Document {}
export interface PostModel extends IPost, Document {}