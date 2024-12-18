import webhookController from '@controllers/webhookController';
import RequestBuilder from '@builders/requestBuilder';
import messageHandler from '@services/messageHandler';

describe('Unit test suite for webhookController', () => {
    afterAll(() => {
        jest.clearAllMocks();
    })
    test('Should handle incoming and return a status of 200', async () => {
        const sendStatusMock = jest.fn();
        const responseMock = {
            sendStatus: sendStatusMock,
        };
        const request = new RequestBuilder().build();
        const handleIncommingSpyOn = jest.spyOn(messageHandler, 'handleIncomingMessage').mockResolvedValue(true);

        await webhookController.handleIncoming(request, responseMock);
        
        expect(handleIncommingSpyOn).toHaveBeenCalled();
        expect(sendStatusMock).toHaveBeenCalledWith(200);
    });

    test('Should return the verify webhook and return status code 200', async () => {
        const responseMock = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
          };
        const request = new RequestBuilder().build();
        const handleIncommingSpyOn = jest.spyOn(messageHandler, 'handleIncomingMessage').mockResolvedValue(true);

        await webhookController.verifyWebhook(request, responseMock);
        
        expect(handleIncommingSpyOn).toHaveBeenCalled();
        expect(sendStatusMock).toHaveBeenCalledWith(200);
    });
});