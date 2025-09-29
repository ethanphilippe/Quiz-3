describe('OrangeHRM Login Feature Test', () => { 
    
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    it('TC-001: Should allow user to login with valid credentials', () => {
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/dashboard');
        cy.contains('Dashboard').should('be.visible');
    });

    it('TC-002: Should display error for invalid password', () => {
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('salah_total');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC-003: Should display error for invalid username', () => {
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('user_salah');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC-004: Login Gagal, Username & Password Invalid', () => {
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('usernametidakada');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('passwordpalsu');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC-005: Should show "Required" message when username is empty', () => {
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123');
        cy.get('button[type="submit"]').click();
        
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-input-field-bottom-space > .oxd-text') 
            .should('be.visible')
            .and('contain', 'Required');
    });
});