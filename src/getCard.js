export default ({ pluginConfig, context }) => {
    const { nextRelease } = context;

    return {
        '@type': 'MessageCard',
        '@context': 'http://schema.org/extensions',
        'summary': 'New version released',
        'sections': [
            {
                activityTitle: 'New version released',
                activitySubtitle: pluginConfig?.packageName || '',
                facts: [
                    {
                        name: 'Version',
                        value: nextRelease.gitTag
                    },
                    {
                        name: 'Release Type',
                        value: nextRelease.type
                    },
                    {
                        name: 'Status',
                        value: 'Success'
                    }
                ]
            }
        ]
    };
};
