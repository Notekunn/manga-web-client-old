import { fetchWithoutToken, fetchWithToken } from './axiosClient';
const artistFragment = `
fragment artistField on Artist {
  _id
  name
  name
  slug
  about
  coverUrl
}
`;
const getAllQuery = `
{
  artists {
    ...artistField
  }
}
${artistFragment}
`;
const createQuery = `
mutation($artistInput: ArtistInput!) {
  createArtist(artistInput: $artistInput) {
    ...artistField
  }
}
${artistFragment}
`;
const updateQuery = `
mutation($_id: ID!, $artistInput: ArtistChangesInput!) {
  updateArtist(_id: $_id, artistInput: $artistInput) {
    ...artistField
  }
}
${artistFragment}
`;

export const getAll = async () => {
  const res = await fetchWithoutToken(getAllQuery);
  return res?.artists;
};
export const updateArtist = async (token, _id, { name, about, coverUrl }) => {
  const variables = {
    _id,
    artistInput: { name, about, coverUrl },
  };
  const res = await fetchWithToken(token)(updateQuery, variables);
  return res?.updateArtist;
};
export const createArtist = async (token, { name, about, coverUrl }) => {
  const variables = { artistInput: { name, about, coverUrl } };
  const res = await fetchWithToken(token)(createQuery, variables);
  return res?.createArtist;
};
