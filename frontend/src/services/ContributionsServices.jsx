import React from 'react'
import api from '../api/api'

const giveContributionApi = (id) => {
    return '/api/contributors/' + id + '/contributions/';
}

export const FetchContributions = async (id) => {
    try {
        const resp = await api.get(giveContributionApi(id));

        return resp;
    } catch (err) {
        throw err;
    }
}