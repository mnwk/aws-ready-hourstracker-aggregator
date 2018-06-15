export function getEnv(name: string, defaultValue?: string): string {

  if (process.env[ name ] !== undefined) {
    return process.env[ name ]
  }
  if (defaultValue) {
    return defaultValue
  }
  throw new EnvironmentVariableNotSetException(`Variable ${name} not found.`)
}

export class EnvironmentVariableNotSetException extends Error {
}