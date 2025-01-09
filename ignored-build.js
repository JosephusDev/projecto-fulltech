const url = process.env.VERCEL_HOOK_URL // URL do deploy
if (url && url.includes('source=hook')) {
	console.log('Deploy triggered by hook. Allowing build ' + url)
	process.exit(1)
} else {
	console.log('Deploy not triggered by hook. Ignoring build ' + url)
	process.exit(0)
}
