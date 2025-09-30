import PageClass from '../pages/loginPage'; 

const loginPage = new PageClass(); 

describe('Tugas Final: POM & Network Intercepts', () => { 
    
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    it('TC-001: Should successfully log in and check response Status 200', () => {
        cy.intercept('POST', '/web/index.php/auth/validate').as('loginSuccess');
        loginPage.login('Admin', 'admin123');
        cy.wait('@loginSuccess').its('response.statusCode').should('eq', 200);
        cy.url().should('include', '/dashboard');
    });

    it('TC-002: Should display error for invalid password and check response content', () => {
        cy.intercept('POST', '/web/index.php/auth/validate').as('invalidLogin');
        loginPage.login('Admin', 'salah_total');
        cy.wait('@invalidLogin').its('response.body.message').should('include', 'Invalid credentials');
        loginPage.getInvalidCredentialsError().should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC-003: Should display error for invalid username and check request headers', () => {
        cy.intercept('POST', '/web/index.php/auth/validate').as('requestHeaders');
        loginPage.login('user_salah', 'admin123');
        cy.wait('@requestHeaders').its('request.headers.Content-Type').should('include', 'application/json');
        loginPage.getInvalidCredentialsError().should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC-004: Should check login response time for invalid combination', () => {
        const startTime = new Date().getTime(); 
        cy.intercept('POST', '/web/index.php/auth/validate').as('responseTime');
        loginPage.login('usernametidakada', 'passwordpalsu');
        
        cy.wait('@responseTime').then(() => {
             const duration = new Date().getTime() - startTime;
             expect(duration).to.be.lessThan(1500);
        });
        loginPage.getInvalidCredentialsError().should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC-005: Should show "Required" message and intercept the stylesheet load', () => {
        cy.intercept('GET', '**/*.css').as('cssLoad');
        
        loginPage.typePassword('admin123');
        loginPage.clickLogin();

        cy.wait('@cssLoad').its('response.statusCode').should('eq', 200);
        loginPage.getUsernameRequiredError().should('be.visible').and('contain', 'Required');
    });
});