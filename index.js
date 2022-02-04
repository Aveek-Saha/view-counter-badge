addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  return new Response('https://img.shields.io/badge/Views-10-green.svg', {
    headers: { 'content-type': 'text/plain' },
  })
}
