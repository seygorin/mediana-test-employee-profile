exports.handler = async (event) => {
  try {
    const response = await fetch(
      `https://json.sandbox.process.kz/${event.path.replace(/^\/api\//, '')}`,
      {
        method: event.httpMethod,
        headers: {'Content-Type': 'application/json'},
        body: event.httpMethod === 'GET' ? undefined : event.body,
      }
    )

    const data = await response.json()

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    }
  } catch {
    return {statusCode: 500, body: JSON.stringify({error: 'Proxy error'})}
  }
}
