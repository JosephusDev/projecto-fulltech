const url = process.env.VERCEL_URL // URL do deploy
if (url && url.includes('source=hook')) {
	console.log('Deploy triggered by hook. Allowing build.')
	process.exit(1)
} else {
	console.log('Deploy not triggered by hook. Ignoring build.')
	process.exit(0)
}
