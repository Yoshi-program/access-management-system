export type IBodystring = {
  token: string
  version: string
  appId: string
  // access: string // in or out
}

export type AccessContent = {
  userId: string
  floorId: number
  access: string
}
