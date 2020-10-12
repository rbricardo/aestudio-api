import * as dotEnvSafe from 'dotenv-safe'
import * as path from 'path'

try {
  if (process.env.NODE_ENV !== 'production') {
    let envPath = '.env'

    if (process.env.NODE_ENV) {
      envPath = `${envPath}.${process.env.NODE_ENV}`
    }

    dotEnvSafe.config({
      allowEmptyValues: true,
      example: path.resolve(process.cwd(), '.env.example'),
      path: path.resolve(process.cwd(), envPath),
    })
  }
} catch (err) {
  console.log(err)
  throw err
}

interface Config {
  readonly LOGGING: {
    readonly COMBINED_FILE?: string
    readonly ERROR_FILE?: string
    readonly LEVEL?: string
    readonly TYPE?: string
  }
  readonly NODE_ENV?: string
  readonly SERVER_PORT?: number
}

const {
  LOGGING_COMBINED_FILE,
  LOGGING_ERROR_FILE,
  LOGGING_LEVEL,
  LOGGING_TYPE,
  NODE_ENV,
  SERVER_PORT,
} = process.env

const config: Config = {
  LOGGING: {
    COMBINED_FILE: LOGGING_COMBINED_FILE,
    ERROR_FILE: LOGGING_ERROR_FILE,
    LEVEL: LOGGING_LEVEL,
    TYPE: LOGGING_TYPE,
  },
  NODE_ENV,
  SERVER_PORT: SERVER_PORT ? parseInt(SERVER_PORT, 10) : 0,
}

export default config
