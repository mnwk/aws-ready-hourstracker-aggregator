import test from 'ava'
import { EnvironmentVariableNotSetException, getEnv } from '../../../src/utils/wrapper'

test.serial('existing var', t => {
  process.env[ 'myUniqueTestVar' ] = 'someValue'
  t.notThrows(() => getEnv('myUniqueTestVar', 'someDefaultHappy'))
  t.is(getEnv('myUniqueTestVar', 'someDefaultHappy'), 'someValue')
})

test.serial('pass default', t => {
  delete process.env[ 'myUniqueTestVar' ]
  t.notThrows(() => getEnv('myUniqueTestVar', 'someDefaultTest'))
  t.is(getEnv('myUniqueTestVar', 'someDefaultTest'), 'someDefaultTest')
})

test.serial('non existing var', t => {
  delete process.env[ 'myUniqueTestVar' ]
  t.throws(() => getEnv('myUniqueTestVar'), EnvironmentVariableNotSetException)
})