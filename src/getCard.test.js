import pkg from '../package.json';

import getCard from './getCard';

const version = '1.2.3';
const packageName = pkg.name;
const mockContext = { logger: console, nextRelease: { gitTag: `v${version}` } };

describe('getCard', () => {
    test('should apply the correct version to the card', () => {
        const card = getCard({
            context: mockContext
        });

        expect(card.sections[0].facts).toContainEqual({
            name: 'Version',
            value: expect.stringContaining(version)
        });
    });

    test('apply the packageName to the card', () => {
        const card = getCard({
            pluginConfig: {
                packageName
            },
            context: mockContext
        });

        expect(card.sections[0].activitySubtitle).toEqual(packageName);
    });
});
