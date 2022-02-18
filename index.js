const { badgen } = require('badgen')

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
/**
 * Respond with svg badge
 * @param {Request} request
 */
async function handleRequest(request) {
    var count = await ViewCounter.get('count')

    if (count) {
        var views = parseInt(JSON.parse(count)) + 1
        await ViewCounter.put('count', JSON.stringify(views))
    } else {
        var views = 0
        await ViewCounter.put('count', JSON.stringify(views))
    }

    const { searchParams } = new URL(request.url)
    let label = searchParams.get('label') || 'Views'
    let labelColor = searchParams.get('labelColor') || '555'
    let color = searchParams.get('color') || 'blue'
    let style = searchParams.get('style') || 'flat'
    let scale = searchParams.get('scale') || 1

    const svgString = badgen({
        label: label,
        labelColor: labelColor,
        color: color,
        style: style,
        scale: scale,
        status: views.toString(),
    })
    return new Response(svgString, {
        headers: {
            'content-type': 'image/svg+xml',
            'Permissions-Policy': 'interest-cohort=()',
        },
    })
}
