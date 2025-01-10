const branch = process.env.VERCEL_GIT_COMMIT_REF || 'unknown'

if (branch === 'main') {
	console.log('Deploy triggered by branch main. Allowing build.')
	process.exit(1) // Permite o build
} else {
	console.log(`Deploy triggered by branch ${branch}. Ignoring build.`)
	process.exit(0) // Ignora o build
}
