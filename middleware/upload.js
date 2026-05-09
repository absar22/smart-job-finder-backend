const mutler = require('multer')
const storage = mutler.diskStorage({})
const upload = mutler({ storage })

module.exports = upload