import SemanticReleaseError from '@semantic-release/error';

import getUrls from './getUrls';

const prefix = 'http://www.';

const validUrls = ['test.com', 'test-one.co.uk'].map(url => `${prefix}${url}`);
const invalidUrls = ['test', 'test2'];

const ENV_KEY = 'some-key';

describe('getUrls', () => {
    test('should return a list of valid urls from the env var given', () => {
        const pluginConfig = {
            envKey: ENV_KEY
        };
        const context = {
            env: {
                [ENV_KEY]: validUrls.join(',')
            }
        };

        expect(getUrls({ pluginConfig, context })).toEqual(validUrls);
    });

    test('should default to NOTIFY_TEAMS_LIST if no envKey is given in config', () => {
        const pluginConfig = {};
        const context = {
            env: {
                NOTIFY_TEAMS_LIST: validUrls.join(',')
            }
        };

        expect(getUrls({ pluginConfig, context })).toEqual(validUrls);
    });

    test('should throw an error if only given invalid url', () => {
        const pluginConfig = {};
        const context = {
            env: {
                NOTIFY_TEAMS_LIST: invalidUrls.join(',')
            }
        };

        expect(() => getUrls({ pluginConfig, context })).toThrowError(
            new SemanticReleaseError(
                `Url at index 0 in env.NOTIFY_TEAMS_LIST is not a valid url`
            )
        );
    });

    test('should throw an error if given mix of invalid and valid urls', () => {
        const pluginConfig = {};
        const context = {
            env: {
                NOTIFY_TEAMS_LIST: [...validUrls, ...invalidUrls].join(',')
            }
        };

        expect(() => getUrls({ pluginConfig, context })).toThrowError(
            new SemanticReleaseError(
                `Url at index 2 in env.NOTIFY_TEAMS_LIST is not a valid url`
            )
        );
    });

    test('should throw an error if no url is given in default key', () => {
        const pluginConfig = {};
        const context = {
            env: {
                NOTIFY_TEAMS_LIST: ''
            }
        };

        expect(() => getUrls({ pluginConfig, context })).toThrowError(
            new SemanticReleaseError(
                `Could not find any urls in env.NOTIFY_TEAMS_LIST`
            )
        );
    });

    test('should throw an error if no url is given in configured key', () => {
        const pluginConfig = {
            envKey: ENV_KEY
        };
        const context = {
            env: {
                [ENV_KEY]: ''
            }
        };

        expect(() => getUrls({ pluginConfig, context })).toThrowError(
            new SemanticReleaseError(
                `Could not find any urls in env.${ENV_KEY}`
            )
        );
    });
});
