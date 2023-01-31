import type IBodystring from '../types/access'

const currentVersion = '1.0.0'
const currentAppId = '1'

const checkAccess = (body: IBodystring) => {
  const { token, version, appId } = body
  if (version !== currentVersion) {
    // versionが異なるときの処理
  }
  if (appId !== currentAppId) {
    // appIdが異なるときの処理
  }
  // tokenをもとにDBからUserIdを取得
}

export default checkAccess
