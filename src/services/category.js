import { fetchWithoutToken, fetchWithToken } from "./axiosClient";
const categoryFragment = `
fragment categoryField on Category {
  _id
  title
  slug
  description
}
`;
const getAllQuery = `
{
  categories {
    ...categoryField
  }
}
${categoryFragment}
`;
const createQuery = `
mutation($categoryInput: CategoryInput!) {
  createCategory(categoryInput: $categoryInput) {
    ...categoryField
  }
}
${categoryFragment}
`;
const updateQuery = `
mutation($_id: ID!, $categoryInput: CategoryChangesInput!) {
  updateCategory(_id: $_id, categoryInput: $categoryInput) {
    ...categoryField
  }
}
${categoryFragment}
`;
const deleteQuery = `
mutation ($_id: ID!){
  deleteCategory(_id: $_id){
    success
    rowsDeleted
  }
}
`;
export const getAll = async () => {
  const res = await fetchWithoutToken(getAllQuery);
  return res?.categories;
};
export const updateCategory = async (token, _id, { title, description }) => {
  const variables = {
    _id,
    categoryInput: { title, description },
  };
  const res = await fetchWithToken(token)(updateQuery, variables);
  return res?.updateCategory;
};
export const createCategory = async (token, { title, description }) => {
  const variables = { categoryInput: { title, description } };
  const res = await fetchWithToken(token)(createQuery, variables);
  return res?.createCategory;
};
export const deleteCategory = async (token, _id) => {
  const variables = { _id };
  const res = await fetchWithToken(token)(deleteQuery, variables);
  return res?.deleteCategory;
};
