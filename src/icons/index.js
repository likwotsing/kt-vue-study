const req = require.context('./svg', false, /\.svg$/)
console.log(req.keys())
console.log(req.keys().map(req))
req.keys().map(req)
