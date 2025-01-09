const triggerSource = process.env.VERCEL_GIT_COMMIT_REF || 'undefined'

if (triggerSource) {
	console.log('Deploy not triggered by a hook. Ignoring build: ' + triggerSource)
	process.exit(0) // Retorna 0 para ignorar o build.
} else {
	console.log('Deploy triggered by a hook. Allowing build: ' + triggerSource)
	process.exit(1) // Retorna 1 para permitir o build.
}
