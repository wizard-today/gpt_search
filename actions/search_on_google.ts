import * as cheerio from 'cheerio'
import { Action, GetRequestInput } from '../server/types'
import { fetchHtml } from '../lib/fetch_html'

type Input = {
  query: string
  location?: string
  lang?: string
}

type Page = {
  title: string
  link: string
  snippet: string
  content?: string
}

type Output = Page[]

const parseInput = (input: GetRequestInput): Input => ({
  query: input['query'],
  location: input['location'],
  lang: input['lang'],
})

const parseLinks = (html: string) => {
  const $ = cheerio.load(html)
  const pages: Page[] = []

  $('.g .yuRUbf').each((_, element) => {
    const title = $(element).find('h3').text()
    const link = $(element).find('a').attr('href') ?? ''
    const snippet = $(element).next('.VwiC3b').text()

    pages.push({ title, link, snippet })
  })

  return pages
}

export const search_on_google: Action<Output> = async input => {
  const { query, location, lang } = parseInput(input)
  const q = encodeURIComponent(query)
  const searchHtml = await fetchHtml(
    `https://www.google.com/search?q=${q}&gl=${location ?? 'us'}&hl=${lang ?? 'en'}`
  )
  return parseLinks(searchHtml)
}
