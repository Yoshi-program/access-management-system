import type { UserData, UserTotalTime } from '../types/dataTypes'

export function calculateTotalTime(data: UserData[]): UserTotalTime[] {
  const userTotalTime: { [key: string]: number } = {}

  for (let i = 0; i < data.length; i++) {
    const currentData = data[i]
    const { name, action, date } = currentData

    if (action === 'out') {
      const previousData = data[i - 1]
      const startTime = new Date(previousData.date).getTime()
      const endTime = new Date(date).getTime()
      const timeDifference = endTime - startTime

      if (userTotalTime[name]) {
        userTotalTime[name] += timeDifference
      } else {
        userTotalTime[name] = timeDifference
      }
    }
  }

  return Object.entries(userTotalTime).map(([name, totalTime]) => ({
    name,
    totalTime,
  }))
}
