// ignored-build.js
const commitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE

if (commitMessage) {
	console.log('✅ - Build permitida (commit do deploy hook): ' + commitMessage)
	process.exit(1) // Permite o build
} else {
	console.log('🚫 - Build ignorada (commit normal): ' + commitMessage)
	process.exit(0) // Ignora o build
}
