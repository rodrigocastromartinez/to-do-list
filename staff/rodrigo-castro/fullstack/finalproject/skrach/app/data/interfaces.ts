import { Document, Model } from 'mongoose';

interface IUser {
  name: string
  email: string
  password: string
  avatar?: string
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