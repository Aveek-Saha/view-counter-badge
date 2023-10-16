const { badgen } = require('badgen');

const CounterName = 'Counter1';

export default {
  async fetch(request, env, ctx) {
    // Get the value from D1
    let count = await env.ViewCounter.prepare(
      'SELECT * FROM ViewCounter WHERE Name = ?1',
    )
      .bind(CounterName)
      .first('Value');

    // If the value is null, insert a new record
    if (!count) {
      count = 1;

      var result = await env.ViewCounter.prepare(
        'INSERT INTO ViewCounter (Name, Value) VALUES (?1, ?2)',
      )
        .bind(CounterName, count)
        .run();
      console.log('Insert result', result);
    } else {
      // Value++
      count++;

      // Update the value to D1
      var result = await env.ViewCounter.prepare(
        'UPDATE ViewCounter SET Value = ?1 WHERE Name = ?2',
      )
        .bind(count, CounterName)
        .run();
      console.log('Update result', result);
    }
    console.log('Count', count);

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
    console.log('SVG', svgString);

    return new Response(svgString, {
      headers: {
        'content-type': 'image/svg+xml;charset=utf-8',
        'access-control-allow-origin': '*',
        'Cache-Control':
          'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      },
    });
  },
};
