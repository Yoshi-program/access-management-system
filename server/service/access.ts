import type IBodystring from '../types/access'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const currentVersion = '1.0.0'
const currentAppId = '1'

const main = async () => {
  const users = await prisma.user.findMany()
  console.log(users)
}

const checkAccess = async (body: IBodystring) => {
  const { token, version, appId } = body
  console.log('token = ', token)
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
  if (version !== currentVersion) {
    // versionが異なるときの処理
  }
  if (appId !== currentAppId) {
    // appIdが異なるときの処理
  }
  // tokenをもとにDBからUserIdを取得
}

export default checkAccess
