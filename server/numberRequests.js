
let requestNumber = 1
export default function(req, res, next) {
    console.log()
    console.log('Request #'+requestNumber+' for '+req.path)
    requestNumber++
    next()
}