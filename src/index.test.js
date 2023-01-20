import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { success } from './index';

const mockAxios = new MockAdapter(axios);

const url = 'http://test.com';

describe('index', () => {
    test('should call sendNotification with a card', async () => {
        expect.assertions(1);

        const context = {
            logger: console,
            nextRelease: {
                gitTag: 'v1.2.3'
            },
            env: {
                NOTIFY_TEAMS_LIST: url
            }
        };

        mockAxios.onPost().reply(config => {
            const configObject = JSON.parse(config.data);
            expect(configObject).toEqual(
                expect.objectContaining({
                    summary: `New version released`
                })
            );
            return [200];
        });

        await success({}, context);
    });
});
