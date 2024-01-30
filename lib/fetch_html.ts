import https from 'https'

export const fetchHtml = (link: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const request = https.get(link, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64 rv:104.0) Gecko/20100101 Firefox/104.0'
      }
    }, (response) => {
      let data = ''

      response.on('data', (chunk) => {
        data += chunk
      })

      response.on('end', () => {
        resolve(data)
      })
    })

    request.on('error', (error) => {
      reject(error)
    })

    request.end()
  })
}
