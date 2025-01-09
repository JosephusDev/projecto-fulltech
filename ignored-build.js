// ignored-build.js
const commitAuthor = process.env.VERCEL_GIT_COMMIT_AUTHOR_NAME || ''

if (commitAuthor) {
	console.log('🚫 - Build ignorada (commit normal).')
	process.exit(0) // Ignora o build
} else {
	console.log('✅ - Build permitida (commit do deploy hook).')
	process.exit(1) // Permite o build
}
