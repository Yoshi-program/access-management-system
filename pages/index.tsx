import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import qrcode from 'qrcode'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const QrCodeImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  max-width: 100%;
  height: auto;
  transform: translate(-50%, -50%);
`

const Home: NextPage = () => {
  const [qrCodeData, setQrCodeData] = useState<string>('')

  const currentVersion = '1.0.0'
  const currentAppId = '1'
  const router = useRouter()
  const token = router.query.token

  const qrCodeText: string = JSON.stringify({
    version: currentVersion,
    appId: currentAppId,
    token: token,
  })

  useEffect(() => {
    qrcode.toDataURL(qrCodeText, (err, url) => {
      setQrCodeData(url)
    })
  }, [qrCodeText])

  return <QrCodeImg src={qrCodeData} alt="QRCode-image" />
}

export default Home
