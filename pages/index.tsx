import type { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import QrReader from '../components/QrReader'

const Home: NextPage = () => {
  // Modal の開閉
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const onClickToggle = () => {
    setIsOpen(!isOpen)
  }
  // 読み込んだ QR コードのテキスト情報を格納
  const [result, setResult] = useState<string>('')

  // form の設定・処理
  const { handleSubmit, register } = useForm()
  const onSubmitForm = (formData: any) => {
    console.log(formData)
  }

  // const container = css`...`
  // const formStyle = css`...`
  // const qrButton = css`...`

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <input type="text" {...register('code')} defaultValue={result} />
        <button type="submit">submit</button>
      </form>

      <button onClick={onClickToggle}>
        <img src="/qr-code.png" alt="scan qr code" />
      </button>
      <QrReader setResult={setResult} onRequestClose={() => setIsOpen(false)} />
      <p>{result}</p>
      {/* <ScanModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} setResult={setResult} /> */}
    </div>
  )
}

export default Home

// import { useState } from 'react'
// import { useZxing } from 'react-zxing'

// const BarcodeScanner = () => {
//   const [result, setResult] = useState('')
//   const { ref } = useZxing({
//     onResult(result) {
//       setResult(result.getText())
//     },
//   })

//   return (
//     <>
//       <video ref={ref} />
//       <p>
//         <span>Last result:</span>
//         <span>{result}</span>
//       </p>
//     </>
//   )
// }

// export default BarcodeScanner

// import type { NextPage } from 'next'
// import QrReader from 'react-qr-reader'

// const Home: NextPage = () => {
//   const state = {
//     result: 'No result',
//   }

//   const handleScan = (data: any) => {
//     if (data) {
//       data.setState({
//         result: data,
//       })
//     }
//   }
//   const handleError = (err: any) => {
//     console.error(err)
//   }
//   return (
//     <div>
//       <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '100%' }} />
//       <p>{state.result}</p>
//     </div>
//   )
// }
// export default Home

// import {
//   Box,
//   ChakraProvider,
//   Container,
//   Fade,
//   Flex,
//   Heading,
//   Table,
//   Tbody,
//   Td,
//   Tr,
// } from '@chakra-ui/react'
// import type { IScannerControls } from '@zxing/browser'
// import { BrowserQRCodeReader } from '@zxing/browser'
// import type { Result } from '@zxing/library'
// import type { FC } from 'react'
// import { useEffect, useRef, useState } from 'react'

// const QrCodeReader: FC<{ onReadQRCode: (text: Result) => void }> = ({ onReadQRCode }) => {
//   const controlsRef = useRef<IScannerControls | null>()
//   const videoRef = useRef<HTMLVideoElement>(null)

//   useEffect(() => {
//     if (!videoRef.current) {
//       return
//     }
//     const codeReader = new BrowserQRCodeReader()
//     codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, error, controls) => {
//       if (error) {
//         return
//       }
//       if (result) {
//         onReadQRCode(result)
//       }
//       controlsRef.current = controls
//     })
//     return () => {
//       if (!controlsRef.current) {
//         return
//       }

//       controlsRef.current.stop()
//       controlsRef.current = null
//     }
//   }, [onReadQRCode])

//   return <video style={{ maxWidth: '100%', maxHeight: '100%', height: '100%' }} ref={videoRef} />
// }

// const QrCodeResult: FC<{ qrCodes: string[] }> = ({ qrCodes }) => {
//   return (
//     <Table>
//       <Tbody>
//         {qrCodes.map((qr, i) => (
//           <Tr key={i}>
//             <Td>
//               <Fade in={true}>{qr}</Fade>
//             </Td>
//           </Tr>
//         ))}
//       </Tbody>
//     </Table>
//   )
// }

// const QrApp = () => {
//   const [qrCodes, setQrCodes] = useState<string[]>([])

//   return (
//     <ChakraProvider>
//       <Container>
//         <Flex flexDirection="column">
//           <Box flex={1} height={'60vh'}>
//             <QrCodeReader
//               onReadQRCode={(result) => {
//                 setQrCodes((codes) => {
//                   return [result.getText(), ...codes]
//                 })
//               }}
//             />
//           </Box>
//           <Box flex={1} height={'40vh'}>
//             <Heading>Result</Heading>
//             <QrCodeResult qrCodes={qrCodes} />
//           </Box>
//         </Flex>
//       </Container>
//     </ChakraProvider>
//   )
// }

// export default function Home() {
//   return (
//     <ChakraProvider>
//       <QrApp />
//     </ChakraProvider>
//   )
// }

// import type { NextPage } from 'next'
// import { useState } from 'react'
// import QrReader from '../components/QrReader'

// const Home: NextPage = () => {
//   const [result, setResult] = useState('')
//   // const { ref } = useZxing({
//   //   onResult(result) {
//   //     setResult(result.getText())
//   //   },
//   // })

//   return (
//     <>
//       <QrReader setResult={setResult} onRequestClose={() => null} />
//       <p>
//         <span>Last result:</span>
//         <span>{result}</span>
//       </p>
//     </>
//   )
// }

// export default Home
