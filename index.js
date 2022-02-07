addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

  var count = await ViewCounter.get('count')

  if (count){
    var views = count.views + 1
    await ViewCounter.put('count', views);
  }
  else{
    var views = 0
    await ViewCounter.put('count', views);
  }
  var res = {
      "schemaVersion": 1,
      "label": "Views",
      "message": views,
      "color": "orange"
    }
  return new Response(JSON.stringify(res), {
    headers: { 'content-type': 'application/json' },
  })
}
