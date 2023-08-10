import { Document, Model, Schema } from 'mongoose'

const { Types: { ObjectId } } = Schema

interface IUser {
  name: string
  email: string
  password: string
  avatar?: string
  projects: typeof ObjectId[]
}

interface IProject {
  name: string
  date: Date
  owners: typeof ObjectId[]
  privacy: string
  tracks: typeof ObjectId[]
  image: string
}

interface ITrack {
  project: typeof ObjectId
  date: Date
  audio: string
}

export interface UserModel extends IUser, Document {}
export interface ProjectModel extends IProject, Document {}
export interface TrackModel extends ITrack, Document {}