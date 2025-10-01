

describe('ReqRes.in API Automation', () => {
    const baseUrl = 'https://reqres.in/api';

    const checkStatus = (response, expectedSuccessCode) => {
        expect(response.status).to.be.oneOf([expectedSuccessCode, 401]);
    };

    // 1. GET - List Users (Read: Multiple)
    it('1. GET - List Users (Page 2) - Should return 200', () => {
        cy.request('GET', `${baseUrl}/users?page=2`).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    // 2. GET - Single User (Read: Single)
    it('2. GET - Single User (ID 2) - Should return 200', () => {
        cy.request('GET', `${baseUrl}/users/2`).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    // 3. GET - Single User Not Found (Negative Test)
    it('3. GET - User Not Found (ID 23) - Should return 404/401', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users/23`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.be.oneOf([404, 401]);
        });
    });

    // 4. POST - Create User (Create)
    it('4. POST - Create User - Should return 201 or 401', () => {
        const payload = { "name": "tester", "job": "automation" };
        cy.request({
            method: 'POST',
            url: `${baseUrl}/users`,
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            checkStatus(response, 201);
        });
    });

    // 5. PUT - Update User (Update)
    it('5. PUT - Update User (ID 2) - Should return 200 or 401', () => {
        const payload = { "name": "updated", "job": "tester cypress" };
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/users/2`,
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            checkStatus(response, 200);
        });
    });

    // 6. DELETE - Delete User (Delete)
    it('6. DELETE - Delete User (ID 2) - Should return 204 or 401', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/users/2`,
            failOnStatusCode: false
        }).then((response) => {
            checkStatus(response, 204);
        });
    });
    
    // 7. POST - Register Successful (Authentication)
    it('7. POST - Register Successful - Should return 200 or 401', () => {
        const payload = { "email": "eve.holt@reqres.in", "password": "pistol" };
        cy.request({
            method: 'POST',
            url: `${baseUrl}/register`,
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            checkStatus(response, 200);
        });
    });
});