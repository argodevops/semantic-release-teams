/* eslint-disable no-template-curly-in-string */
const pkg = require('./package.json');

const branches = [
    'main',
    {
        name: 'alpha',
        prerelease: true
    }
];

const commitAnalyzer = [
    '@semantic-release/commit-analyzer',
    {
        releaseRules: [
            {
                type: 'revert',
                scope: '*',
                release: 'patch'
            },
            {
                type: 'chore',
                scope: '*',
                release: 'patch'
            },
            {
                type: 'refactor',
                scope: '*',
                release: 'patch'
            },
            {
                type: 'perf',
                scope: '*',
                release: 'patch'
            }
        ]
    }
];

const releaseNotesGenerator = [
    '@semantic-release/release-notes-generator',
    {
        parserOpts: {
            noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING']
        },
        presetConfig: {
            types: [
                {
                    type: 'feat',
                    section: 'Features'
                },
                {
                    type: 'fix',
                    section: 'Bug Fixes'
                },
                {
                    type: 'revert',
                    section: 'Internal',
                    hidden: false
                },
                {
                    type: 'chore',
                    section: 'Internal',
                    hidden: false
                },
                {
                    type: 'refactor',
                    section: 'Internal',
                    hidden: false
                },
                {
                    type: 'perf',
                    section: 'Internal',
                    hidden: false
                }
            ]
        }
    }
];

const changelog = '@semantic-release/changelog';

const npm = '@semantic-release/npm';

const deprecate = [
    'semantic-release-npm-deprecate',
    {
        deprecations: [
            {
                version: "< ${nextRelease.version.split('.')[0]}",
                message: "Please use ^${nextRelease.version.split('.')[0]}.0.0."
            }
        ]
    }
];

const git = '@semantic-release/git';

const teams = ['@argodevops/semantic-release-teams', { packageName: pkg.name }];

module.exports = {
    branches,
    plugins: [
        commitAnalyzer,
        releaseNotesGenerator,
        changelog,
        npm,
        deprecate,
        git,
        teams
    ]
};
