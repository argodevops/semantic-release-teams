import SemanticReleaseError from '@semantic-release/error';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import sendNotification from './sendNotification';

const mockAxios = new MockAdapter(axios);

const url = 'http://some-url.com';

describe('sendNotification', () => {
    test('should send a given card to the url', () => {
        expect.assertions(1);
        const card = { summary: 'some-card-data' };

        mockAxios.onPost().reply(config => {
            const configObject = JSON.parse(config.data);
            expect(configObject).toEqual(card);
            return [200];
        });

        sendNotification({ url, card });
    });

    test('should throw a SemanticReleaseError if the url is invalid', async () => {
        await expect(
            sendNotification({ url: 'some-invalid-url', card: {} })
        ).rejects.toThrowError(SemanticReleaseError);
    });

    test('should throw a SemanticReleaseError if the POST fails', async () => {
        mockAxios.onPost().networkErrorOnce();

        await expect(sendNotification({ url, card: {} })).rejects.toThrowError(
            SemanticReleaseError
        );
    });
});
