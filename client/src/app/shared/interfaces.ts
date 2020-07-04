interface essenceDB {
  _id?: string
  date?: Date
}

interface ImageContent {
  imageSrc?: string
}

export interface User extends essenceDB, ImageContent {
  email: string
  password: string
  nickname?: string
}

export interface Post extends essenceDB, ImageContent {
  title: string
  content: string
  userId?: string
}
