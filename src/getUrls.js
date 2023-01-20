import SemanticReleaseError from '@semantic-release/error';

export default ({ pluginConfig, context }) => {
    const { envKey = 'NOTIFY_TEAMS_LIST' } = pluginConfig;
    const { env } = context;
    const envUrls = env[envKey];

    if (!envUrls) {
        throw new SemanticReleaseError(
            `Could not find any urls in env.${envKey}`
        );
    }

    const urlsList = envUrls.split(',').map(url => url.trim());

    urlsList.forEach((url, index) => {
        try {
            // eslint-disable-next-line no-new
            new URL(url);
        } catch (error) {
            throw new SemanticReleaseError(
                `Url at index ${index} in env.${envKey} is not a valid url`
            );
        }
    });

    return urlsList;
};
