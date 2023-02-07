import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import qrcode from 'qrcode'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const QrCodeImg = styled.img<{ num: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  display: ${(props) => (props.num === 0 ? 'none' : 'inline')};
  width: 80%;
  max-width: 100%;
  height: auto;
  transform: translate(-50%, -50%);
`

const BtnArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InBtn = styled.button<{ num: number }>`
  display: ${(props) => (props.num === 1 ? 'none' : 'inline')};
  width: 30%;
  margin: 10%;
  font-size: 5em;
`
const OutBtn = styled.button<{ num: number }>`
  display: ${(props) => (props.num === 1 ? 'none' : 'inline')};
  width: 30%;
  font-size: 5em;
`

const Home: NextPage = () => {
  const [qrCodeData, setQrCodeData] = useState<string>('')
  const [qrState, setQrState] = useState(0)
  const [qrCodeText, setQrCodeText] = useState<string>('')

  const currentVersion = '1.0.0'
  const currentAppId = '1'
  const router = useRouter()
  const token = router.query.token

  const onClick = (access: string) => {
    setQrCodeText(
      JSON.stringify({
        version: currentVersion,
        appId: currentAppId,
        token: token,
        access: access,
      })
    )
    setQrState(1)
  }

  useEffect(() => {
    qrcode.toDataURL(qrCodeText, (err, url) => {
      setQrCodeData(url)
    })
  }, [qrCodeText])

  return (
    <>
      <QrCodeImg src={qrCodeData} alt="QRCode-image" num={qrState} />
      <BtnArea>
        <InBtn onClick={() => onClick('in')} num={qrState}>
          IN
        </InBtn>
        <OutBtn onClick={() => onClick('out')} num={qrState}>
          OUT
        </OutBtn>
      </BtnArea>
    </>
  )
}

export default Home
