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
  position: relative;
  width: 100vw;
  height: 100vh;
`

const InBtn = styled.button<{ num: number }>`
  position: absolute;
  top: 40%;
  left: 50%;
  display: ${(props) => (props.num === 1 ? 'none' : 'inline')};
  width: 50%;
  font-size: 3em;
  text-align: center;
  transform: translate(-50%, -50%);
`
const OutBtn = styled.button<{ num: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  display: ${(props) => (props.num === 1 ? 'none' : 'inline')};
  width: 50%;
  margin-top: 50px;
  font-size: 3em;
  text-align: center;
  transform: translate(-50%, -50%);
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
        {/* <br /> */}
        <OutBtn onClick={() => onClick('out')} num={qrState}>
          OUT
        </OutBtn>
      </BtnArea>
    </>
  )
}

export default Home
