import React from 'react'
import api from '../api/api'

const CONTRIBUTOR_API = '/api/contributors/';

export const FetchContributors = async () => {
  try {
    const resp = await api.get(CONTRIBUTOR_API);

    return resp;
  } catch (err) {
    throw (err);
  }
}

export const AddContributor = async (first_name, last_name) => {
  try {
    const resp = await api.post(CONTRIBUTOR_API, {
      first_name,
      last_name,
    })

    return resp;
  } catch (err) {
    throw (err);
  }
}