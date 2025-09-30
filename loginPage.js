class LoginPage {
    getUsernameField() {
        return cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input');
    }

    getPasswordField() {
        return cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input');
    }

    getLoginButton() {
        return cy.get('button[type="submit"]');
    }

    getInvalidCredentialsError() {
        return cy.get('.oxd-alert-content-text');
    }

    getUsernameRequiredError() {
        return cy.get(':nth-child(2) > .oxd-input-group > .oxd-input-field-bottom-space > .oxd-text');
    }
    
    typeUsername(username) {
        this.getUsernameField().type(username);
    }
    
    typePassword(password) {
        this.getPasswordField().type(password);
    }

    clickLogin() {
        this.getLoginButton().click();
    }
    
    login(username, password) {
        this.typeUsername(username);
        this.typePassword(password);
        this.clickLogin();
    }
}

export default LoginPage;