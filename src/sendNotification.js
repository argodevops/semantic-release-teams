import SemanticReleaseError from '@semantic-release/error';
import axios from 'axios';

export default ({ card, url }) => {
    let validUrl;

    try {
        validUrl = new URL(url).toString();
    } catch (error) {
        return Promise.reject(new SemanticReleaseError(error.message));
    }

    return axios
        .post(validUrl, card, {
            headers: {
                'content-type':
                    'application/vnd.microsoft.teams.card.o365connector'
            }
        })
        .catch(error =>
            Promise.reject(new SemanticReleaseError(error.message))
        );
};
