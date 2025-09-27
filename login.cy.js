// Nama File: login.cy.js

describe('Otomatisasi Login OrangeHRM', () => { 
    
    // SETUP: Kunjungi halaman login sebelum setiap tes
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    // ===========================================
    // 1. TEST CASE POSITIF
    // ===========================================

    it('TC-001: Login Berhasil dengan Kredensial Valid (Admin/admin123)', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/web/index.php/dashboard/index');
        cy.contains('Dashboard').should('be.visible');
    });

    it('TC-007: Mengakses tautan "Forgot your password?"', () => {
        cy.get('.orangehrm-login-forgot > .oxd-text').click();
        cy.url().should('include', '/requestPasswordReset');
        cy.contains('Reset Password').should('be.visible');
    });


    // ===========================================
    // 2. TEST CASE NEGATIF
    // ===========================================

    it('TC-002: Login Gagal dengan Password Invalid', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('salah123');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC-003: Login Gagal dengan Username Invalid', () => {
        cy.get('input[name="username"]').type('userlain');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
    });

    it('TC-004: Login Gagal, Username & Password Invalid', () => {
        cy.get('input[name="username"]').type('usernametidakada');
        cy.get('input[name="password"]').type('passwordpalsu');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
    });
    
    it('TC-005: Login Gagal, Username Kosong (Validasi Required)', () => {
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-input-field-bottom-space > .oxd-text') 
            .should('be.visible')
            .and('contain', 'Required');
    });

    it('TC-006: Login Gagal, Password Kosong (Validasi Required)', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('button[type="submit"]').click();

        cy.get(':nth-child(3) > .oxd-input-group > .oxd-input-field-bottom-space > .oxd-text')
            .should('be.visible')
            .and('contain', 'Required');
    });
});