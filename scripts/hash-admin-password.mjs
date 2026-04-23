import { randomBytes, scryptSync } from 'node:crypto'

const password = process.argv.slice(2).find((argument) => argument !== '--')

if (!password) {
  console.error('Uso: pnpm auth:hash-password -- "SuaSenhaSegura"')
  process.exit(1)
}

const salt = randomBytes(16).toString('hex')
const hash = scryptSync(password.normalize('NFKC'), salt, 64).toString('hex')

console.log(`scrypt:${salt}:${hash}`)
