import fs from 'fs'
import path from 'path'

// Verifique se há payload vindo do Deploy Hook
const payloadPath = path.join('/tmp', 'deploy-hook-payload.json')
let deploySource = 'unknown'

if (fs.existsSync(payloadPath)) {
	const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'))
	deploySource = payload.source || 'unknown'
}

console.log('Deploy source:', deploySource)

if (deploySource === 'deploy_hook') {
	console.log('Deploy triggered by Deploy Hook. Allowing build.')
	process.exit(1)
} else {
	console.log('Deploy not triggered by Deploy Hook. Ignoring build.')
	process.exit(0)
}
