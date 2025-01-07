import { useState } from 'react'

export default function LoginTest() {
	const [email, setEmail] = useState('')
	const [loggedIn, setLoggedIn] = useState(false)

	const logar = () => {
		if (email === 'admin@admin.com') {
			setTimeout(() => setLoggedIn(true), 1000)
		}
	}
	return (
		<div>
			<h2>Login</h2>
			<input placeholder='email' onChange={e => setEmail(e.target.value)} />
			<button title='Logar' onClick={logar} />
			{loggedIn && <h1>Bem-vindo!</h1>}
		</div>
	)
}
