import webhookController from '@controllers/webhookController';

describe('Unit test suite for webhookController', () => {
    test('Should return a status of 200', async () => {
        const responseMock = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await webhookController.webhook(null, responseMock);
        
        expect(responseMock.status).toHaveBeenCalledWith(200);
    });
});