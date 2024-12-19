import webhookController from '@controllers/webhookController';
import RequestBuilder from '@builders/requestBuilder';
import BodyBuilder from '@builders/bodyBuilder';
import EntryBuilder from '@builders/entryBuilder';
import ChangeBuilder from '@builders/changesBuilder';
import ValueBuilder from '@builders/valueBuilder';
import messageHandler from '@services/messageHandler';
import RequestQueryBuilder from '@builders/requestQueryBuilder';
import config from '@config';

describe('Unit test suite for webhookController', () => {
    afterEach(() => {
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

    test('Should handle incoming and return a status of 200 event though a message is empty', async () => {
        const sendStatusMock = jest.fn();
        const responseMock = {
            sendStatus: sendStatusMock,
        };
        const request = new RequestBuilder()
        .withParam('body', new BodyBuilder()
            .withParam('entry', [new EntryBuilder()
                .withParam('changes', [new ChangeBuilder()
                    .withParam('value', new ValueBuilder()
                        .withParam('messages', undefined)
                        .build())
                    .build()])
                .build()])
            .build())
        .build();
        const handleIncommingSpyOn = jest.spyOn(messageHandler, 'handleIncomingMessage').mockResolvedValue(true);

        await webhookController.handleIncoming(request, responseMock);
        
        expect(handleIncommingSpyOn).not.toHaveBeenCalled();
        expect(sendStatusMock).toHaveBeenCalledWith(200);
    });

    test('Should return the verify webhook and return status code 200', async () => {
        const statusMock = jest.fn().mockReturnThis();
        const responseMock = {
            status: statusMock,
            send: jest.fn(),
          };
        const request = new RequestQueryBuilder().withVerifyToken(config.WEBHOOK_VERIFY_TOKEN).build();

        await webhookController.verifyWebhook(request, responseMock);

        expect(statusMock).toHaveBeenCalledWith(200);
    });

    test('Should return 403 forbidden if mode and token is not valid', async () => {
        const statusMock = jest.fn().mockReturnThis();
        const sendStatusMock = jest.fn();
        const responseMock = {
            status: statusMock,
            sendStatus: sendStatusMock
          };
        const request = new RequestQueryBuilder().build();

        await webhookController.verifyWebhook(request, responseMock);
        
        expect(sendStatusMock).toHaveBeenCalledWith(403);
    });
});