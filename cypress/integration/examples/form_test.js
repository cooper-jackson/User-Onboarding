//describe -- two arguments: 1st is a note/comment, 2nd is a callback function

describe('this is a test, idk what im doing', function() {
    const nameInput = () => cy.get('input[name=name]')
    const emailInput = () => cy.get('input[name=email]')
    const passwordInput = () => cy.get('input[name=password]')
    const tosInput = () => cy.get('input[name=agree]')
    const buttonInput = () => cy.get('#submit-button')
    const submitFunction = () => cy.spy(buttonInput, 'onSubmit')

    const obj = {
        onSubmit() {},
    }
    
    beforeEach(function() {
        cy.visit('localhost:3000')
    })
    

    it('this is a sanity check', function() {
        expect(1 + 2).to.equal(3)
        // expect(1 + 2).to.equal(4)
        expect(1 + 2).to.not.equal(4)
    })
    
    it('checking for input existance', function(){
        nameInput().should('exist');        
        emailInput().should('exist');        
        passwordInput().should('exist');        
        tosInput().should('exist');
        buttonInput().should('exist');        
    })

    it('check if input works!', function(){
        nameInput().should('have.value','').type('Coop').should('have.value', 'Coop')
        emailInput().should('have.value','').type('Coop@gmail.com').should('have.value', 'Coop@gmail.com')
        passwordInput().should('have.value','').type('Coops$neakyPassw0rd').should('have.value', 'Coops$neakyPassw0rd')
        tosInput().should('have.value','false').click().should('have.value', 'true')
        tosInput().should('have.value','true').click().should('have.value', 'false')
        // buttonInput().click().then(() => {expect(tosInput().should('have.value', 'true'))}
        tosInput().should('have.value','false').click().should('have.value', 'true')
        buttonInput().click()

    })

})


//

//