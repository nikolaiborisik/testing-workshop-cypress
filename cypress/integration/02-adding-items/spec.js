/// <reference types="cypress" />
it('loads', () => {
  // application should be running at port 3000

  cy.contains('h1', 'todos')
})

beforeEach(function resetData() {
  cy.request('POST', '/reset', {
    todos: []
  })
  cy.visit('/')
})
// IMPORTANT ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// remember to manually delete all items before running the test
// IMPORTANT ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
const addNewItem = item => cy.get('.new-todo').type(`${item}{enter}`)

it('adds two items', () => {
  addNewItem('todo 1')
  addNewItem('todo 2')
  // cy.get(...).should('have.length', 2)
  cy.get('.todo').should('have.length', 2)
})

it('can mark an item as completed', () => {
  addNewItem('item 1')
  addNewItem('item 2')
  cy.get('.todo ')
    .first()
    .find('[type=checkbox]')
    .click()
  cy.get('.todo')
    .first()
    .should('have.class', 'completed')
  cy.get('.todo.completed').should('have.length', 1)
  // adds a few items
  // marks the first item as completed
  // confirms the first item has the expected completed class
  // confirms the other items are still incomplete
})

it('can delete an item', () => {
  addNewItem('item 1')
  addNewItem('item 2')
  cy.get('.todo')
    .first()
    .find('.destroy')
    .click({ force: true })
  cy.get('.todo').should('have.length', 1)
})

it('can add many items', () => {
  const N = 5
  for (let k = 0; k < N; k += 1) {
    addNewItem(`itemt ${k}`)
  }
  cy.get('.todo').should('have.length', N)
})

it('adds item with random text', () => {
  const label = `New Item ${Math.random()}`
  addNewItem(label)
  cy.contains('.todo', label)
    .should('not.have.class', 'completed')
    .and('be.visible')
})

it('starts with zero items', () => {
  cy.get('.todo').should('have.length', 0)
})

it('does not allow adding blank todos', () => {
  // https://on.cypress.io/catalog-of-events#App-Events

  cy.on('uncaught:exception', e => {
    return !e.message.includes('Cannot add a blank todo')
  })

  addNewItem('a')

  // try adding an item with just spaces
})

// what a challenge?
// test more UI at http://todomvc.com/examples/vue/
