import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import qrcode from 'qrcode'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const [tmp, setTmp] = useState<string>('')

  const currentVersion = '1.0.0'
  const currentAppId = '1'
  const router = useRouter()
  const token = router.query.token

  const qrText: string = JSON.stringify({
    version: currentVersion,
    appId: currentAppId,
    token: token,
  })

  useEffect(() => {
    qrcode.toDataURL(qrText, function (err, url) {
      setTmp(url)
    })
  }, [qrText])

  return <img src={tmp} />
}

export default Home
