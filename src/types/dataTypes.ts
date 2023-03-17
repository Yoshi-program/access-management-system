export interface UserData {
  id: number
  name: string
  date: string
  location: string
  action: 'in' | 'out'
}

export interface DataHeader {
  id: keyof UserData
  label: string
}

export interface UserTotalTime {
  name: string
  totalTime: number // in seconds
}
