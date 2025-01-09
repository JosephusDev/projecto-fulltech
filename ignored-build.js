// ignored-build.js
const commitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE || ''

if (commitMessage.includes('[deploy-hook]')) {
	console.log('✅ - Build permitida (commit do deploy hook)')
	process.exit(1) // Permite o build
} else {
	console.log('🚫 - Build ignorada (commit normal)')
	process.exit(0) // Ignora o build
}
