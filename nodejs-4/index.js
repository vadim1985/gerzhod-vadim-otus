const app = require('./src/app')
require('./src/config/mongoConnect')
const PORT = 3000

app.listen(PORT, () => {
  console.log(`app listening ${PORT}`)
})