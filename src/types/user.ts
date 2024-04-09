export interface User {
  id: string
  name: string
  username: string
  email: string
  password: string
  hasBlueprintEmail: boolean
  isEnabled: boolean
  dateJoined: string
  roles: string[]
  team: string
}
