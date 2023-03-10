import type { NextPage } from 'next'

const Admin: NextPage = () => {
  const testPost = async () => {
    const formData = {
      organizationId: '1111111',
      organizationName: 'INIAD.ts',
      discordId: 'aaaaaa',
    }
    await fetch('http://localhost:8081/testPost', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((error) => {
      console.error('エラーが発生しました', error)
    })
  }
  const testGet = async () => {
    fetch('http://localhost:8081/testGet')
      .then((response) => response.body)
      .then((rb) => {
        if (rb === null) return
        const reader = rb.getReader()

        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close()
                  return
                }
                controller.enqueue(value)
                // console.log(done, value)
                push()
              })
            }
            push()
          },
        })
      })
      .then((stream) => new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text())
      .then((result) => {
        console.log(result)
      })
  }
  return (
    <>
      <p>admin page</p>
      <button onClick={testPost}>組織をpost</button>
      <button onClick={testGet}>組織をget</button>
    </>
  )
}
export default Admin
