'use strict'

import build from './app'

const server = build()

if (require.main === module) {
  const start = async () => {
    try {
      await server.listen(3000)
      server.blipp()
    } catch (err) {
      server.log.error(err)
      process.exit(1)
    }
  }
  start()
} else {
  // required as a module => executed on aws lambda
  module.exports = server
}
