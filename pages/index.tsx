import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import QrReader from '../components/QrReader'

const Home: NextPage = () => {
  // 読み込んだ QR コードのテキスト情報を格納
  const [result, setResult] = useState<string>('')

  // form の設定・処理
  const { handleSubmit, register } = useForm()
  const onSubmitForm = (formData: any) => {
    console.log(formData)
  }

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
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <input type="text" {...register('code')} defaultValue={result} />
        <button type="submit">submit</button>
      </form>

      <QrReader setResult={setResult} onRequestClose={() => null} />
      <p>{result}</p>
    </div>
  )
}

export default Home
