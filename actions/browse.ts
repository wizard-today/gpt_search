import * as cheerio from 'cheerio'
import { Action, GetRequestInput } from '../server/types'
import { fetchHtml } from '../lib/fetch_html'
import { cutForLimit } from '../lib/gpt'

type Input = {
  link: string
  offset?: number
}

const parseInput = (input: GetRequestInput): Input => ({
  link: input['link'],
  offset: Number(input['offset'] ?? ''),
})

const trimPageContent = (html: string): string => {
  const $ = cheerio.load(html)

  // remove JS & CSS
  $('body script, body style').remove()

  // images HTML -> MD
  $('img').each((_, el) => {
    const element = $(el)
    const title = element.attr('alt') ?? ''
    const link = element.attr('src')
    element.replaceWith(`![${title}](${link})`)
  })

  // links HTML -> MD
  $('a').each((_, el) => {
    const element = $(el)
    const link = element.attr('href')
    const title = element.text()
    element.replaceWith(`[${title}](${link})`)
  })

  // trim multiple whitespaces
  return $('body').text().replace(/\s+/g, ' ')
}

export const browse: Action<string> = async input => {
  const { link, offset } = parseInput(input)

  const html = await fetchHtml(link)
  const textContent = trimPageContent(html)
  return cutForLimit(textContent, { offset })
}
