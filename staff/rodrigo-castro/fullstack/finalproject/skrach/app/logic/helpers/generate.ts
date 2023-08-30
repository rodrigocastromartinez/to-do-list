import { TrackModel } from "../../data/interfaces"

const generate = {
    track: (projectId: string) => ({
      id: `track-${Math.random()}`,
      project: projectId,
      date: `date-${Math.random()}`,
      audio: `audio-${Math.random()}`,
      volume: Math.random(),
      delay: Math.random(),
      instrument: `instrument-${Math.random()}`,
    }),

    project: (track: TrackModel, userId: string) => ({
      id: `project-${Math.random()}`,
      name: `name-${Math.random()}`,
      date: `date-${Math.random()}`,
      owners: [userId],
      privacy: `privacy-${Math.random()}`,
      tracks: [track],
      image: `image-${Math.random()}`,
      key: `key-${Math.random()}`,
    }),

    user: (projectId?: string) => ({
      id: `user-${Math.random()}`,
      name: `name-${Math.random()}`,
      email: `email-${Math.random()}@mail.com`,
      password: `password-${Math.random()}`,
      avatar: `avatar-${Math.random()}`,
      projects: [projectId],
      description: `description-${Math.random()}`,
    }),
  }
  
  export default generate