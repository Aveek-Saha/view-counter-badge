addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  var res = {
      "schemaVersion": 1,
      "label": "hello",
      "message": "sweet world",
      "color": "orange"
    }
  return new Response(JSON.stringify(res), {
    headers: { 'content-type': 'application/json' },
  })
}
