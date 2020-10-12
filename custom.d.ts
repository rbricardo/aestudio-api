/* eslint-disable @typescript-eslint/no-unused-vars */

import { Server } from 'http'

declare global {
  namespace NodeJS {
    interface Global {
      // eslint-disable-next-line @typescript-eslint/member-delimiter-style
      __appServer__: Server
    }
  }
}
