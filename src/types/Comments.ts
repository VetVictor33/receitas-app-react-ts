import { User } from "./User"

export type Comment = {
  id: number,
  username: User['username'],
  content: string,
  createdAt: Date,
  updatedAt: Date
}