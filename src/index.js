/* eslint-disable import/prefer-default-export */
import getCard from './getCard';
import getUrls from './getUrls';
import sendNotification from './sendNotification';

export const success = (pluginConfig, context) => {
    const card = getCard({ pluginConfig, context });
    const urls = getUrls({ pluginConfig, context });

    return Promise.allSettled(urls.map(url => sendNotification({ card, url })));
};
