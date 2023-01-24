# Semantic-release-teams
`semantic-release--teams` is a plugin for semantic release that will notify a list of urls of a given release, using a preconfigured teams webhook.

## Usage

``` js
// release.config.js OR .releaserc.json

{
    plugins: [
        '@argodevops/semantic-release-teams', { packageName: 'package_one', envKey: 'NOTIFY_URLS' }
    ]
}
```

## Config
- envKey
    - type: `string`
    - default: NOTIFY_TEAMS_LIST
    - The environment variable used to store the comma seperated list of urls to notify
- packageName
    - type: `string`
    - The name of the package to be used in notification messages