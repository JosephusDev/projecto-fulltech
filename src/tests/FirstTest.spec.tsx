import LoginTest from '@/components/LoginTest'
import { render, act } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
describe('Login component', () => {
	it('should render Login Screen', () => {
		const { getByText } = render(<LoginTest />)
		expect(getByText('Login')).toBeInTheDocument()
	})
	it('should render message success when login is successful', async () => {
		const { getByPlaceholderText, getByTitle, findByText, debug } = render(<LoginTest />)
		const input = getByPlaceholderText('email')
		const button = getByTitle('Logar')
		await userEvent.type(input, 'admin@admin.com')
		debug()
		await act(async () => {
			await userEvent.click(button)
		})
		debug()
		expect(await findByText('Bem-vindo!')).toBeInTheDocument()
	})
})
