# Node.js search engine for GPTs

```yml
openapi: 3.0.0
info:
  title: Server API
  description: API for browsing and searching web content
  version: 1.0.0
servers:
  - url: # Server domain
    description: Internet entry point
paths:
  /browse:
    get:
      operationId: Browse
      summary: Browse web page content
      description: Retrieves the content of a specified web page
      parameters:
        - name: link
          in: query
          description: The URL link to browse
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successful response with the content of the web page
          content:
            text/plain:
              schema:
                type: string
  /search_on_google:
    get:
      operationId: SearchOnGoogle
      summary: Search web pages on Google
      description: Performs a search on Google and returns the results.
      parameters:
        - name: query
          in: query
          description: The search query string
          required: true
          schema:
            type: string
        - name: location
          in: query
          description: Geographic location for the search, default 'us'
          required: false
          schema:
            type: string
        - name: lang
          in: query
          description: Language of the search results, default 'en'
          required: false
          schema:
            type: string
      responses:
        '200':
          description: Successful response with search results in JSON format
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    title:
                      type: string
                    link:
                      type: string
                    snippet:
                      type: string
```
