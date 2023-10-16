const { badgen } = require('badgen');

const CounterName = 'Counter1';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond with svg badge
 * @param {Request} request
 */
async function handleRequest(request) {
  // Get the value from D1
  let count = await ViewCounter.prepare(
    'SELECT * FROM ViewCounter WHERE Name = ?1',
  )
    .bind(CounterName)
    .first('Value');

  // Value + 1, also handle the case when the value is null
  ++count;
  console.log(count);

  // Update the value to D1
  var result = await db
    .prepare('UPDATE ViewCounter SET Value = ?1 WHERE Name = ?2')
    .bind(count, CounterName)
    .run();

  console.log(result);

  // Get the query parameters
  const { searchParams } = new URL(request.url);
  let label = searchParams.get('label') || 'Views';
  let labelColor = searchParams.get('labelColor') || '555';
  let color = searchParams.get('color') || 'blue';
  let style = searchParams.get('style') || 'flat';
  let scale = searchParams.get('scale') || 1;

  // Generate the svg string
  const svgString = badgen({
    label: label,
    labelColor: labelColor,
    color: color,
    style: style,
    scale: scale,
    status: count.toString(),
  });
  return new Response(svgString, {
    headers: {
      'content-type': 'image/svg+xml;charset=utf-8',
      'access-control-allow-origin': '*',
      'Cache-Control':
        'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
    },
  });
}
