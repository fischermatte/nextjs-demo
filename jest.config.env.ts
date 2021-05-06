import {loadEnvConfig} from '@next/env'

/** so .env.test gets evaluated instead of .env.local */
export default async () => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
}
