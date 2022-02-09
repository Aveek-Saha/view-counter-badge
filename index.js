import { makeBadge, ValidationError } from 'badge-maker'

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
    var views = parseInt(JSON.parse(count)) + 1
    await ViewCounter.put('count', JSON.stringify(views));
  }
  else{
    var views = 0
    await ViewCounter.put('count', JSON.stringify(views));
  }
  // var res = {
  //     "schemaVersion": 1,
  //     "label": "Views",
  //     "message": views.toString(),
  //     "color": "orange"
  //   }
  const format = {
    label: 'Views',
    message: views.toString(),
    color: 'green',
  }
  
  const svg = makeBadge(format)
  
  // return new Response(JSON.stringify(res), {
  //   headers: { 'content-type': 'application/json' },
  // })

  return new Response(svg, {
    headers: { 'content-type': 'image/svg+xml' },
  })
}
