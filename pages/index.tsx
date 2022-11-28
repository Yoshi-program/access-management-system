import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import QrReader from '../components/QrReader'

const Home: NextPage = () => {
  // 読み込んだ QR コードのテキスト情報を格納
  const [result, setResult] = useState<string>('')

  useEffect(() => {
    const postData = async () => {
      await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrcode: result }),
      })
    }
    postData()
  }, [result])

  return (
    <div>
      <QrReader setResult={setResult} onRequestClose={() => null} />
      <p>{result}</p>
    </div>
  )
}

export default Home
