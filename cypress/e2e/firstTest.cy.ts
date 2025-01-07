import { slowCypressDown } from 'cypress-slow-down'
slowCypressDown(100)
describe('End2End', () => {
	it('should render project screen when user give a valid email and create a new project', () => {
		// redimencionar a janela
		cy.viewport(1280, 720)
		// acessa o site
		cy.visit('/')
		cy.wait(2000)
		// efetua login
		cy.get('#email').focus().type('condepinto2@gmail.com')
		cy.get('#loginButton').click()
		// verifica se a tela de projetos é apresentada
		cy.contains('Projetos').should('exist')
		cy.wait(2000)
		// Clica no adicionar
		cy.get('#openModal').click()
		//verifica se o botão de adicionar cliente está presente
		cy.contains('Adicionar').should('exist')
		// preencher os campos e clicar no botão de confirmar
		cy.get('#nome').focus().type('App E-commerce')
		cy.get('#descricao').focus().type('Website para vendas de roupas e calçados')
		cy.get('#preco').focus().type('200000')
		cy.get('#tecnologias').focus().type('React, Node, Prisma')
		cy.get('#status').click()
		cy.contains('Em andamento').click()
		cy.get('#confirmButton').click()
		cy.wait(2000)
		// fechar o modal
		cy.get('#cancelButton').click()
		// clicar no botão mais do projeto criado
		cy.get('#moreButton2').click()
		cy.wait(2000)
		// clicar em eliminar
		cy.get('#trashButton2').click()
		cy.wait(2000)
		cy.get('#logoutButton').click()
	})
})
