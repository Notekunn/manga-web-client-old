import { fetchWithToken, fetchWithoutToken } from './axiosClient';
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
export const getAll = () => {
  return fetchWithoutToken(getAllQuery).then((res) => res?.artists);
};
