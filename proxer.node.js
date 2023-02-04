const http = require( 'http' )

http.createServer( async ( req, res ) => {
	const headers =  {
		'Content-Type': 'text/plain; charset=utf-8',
		"Access-Control-Allow-Origin": "*"
	}
	try {
		const site = req.url.substring( 1 )
		const response = await fetch( site )
		const response_text = await response.text()
		res.writeHead( 200, headers )
		res.end( response_text )
	} catch( error ) {
		res.writeHead( 500, headers )
		res.end( error.message )
	}
} ).listen( 8081 )
