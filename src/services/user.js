import axiosClient from './axiosClient';
const loginQuery = `
mutation($userName: String!, $password: String!) {
    login(userInput: { userName: $userName, password: $password }) {
        token
        userId
        tokenExpiration
    }
}
`;
const registerQuery = `
mutation ($userName: String!, $password: String!, $name: String, $email: String!) {
    register(userInput: {userName: $userName, name: $name, password: $password, email: $email}) {
      _id
    }
}
`;
const getMeQuery = `
{
    me {
        _id
        userName
        name
        email
        avatarUrl
        permission
        createdAt
    }
}
`
const getAllQuery = `
{
    users {
        _id
        userName
        name
        email
        avatarUrl
        permission
        createdAt
    }
}
`
const deleteUserQuery = `
mutation($_id: ID!) {
    deleteUser(_id: $_id) {
        success
        rowsDeleted
    }
}
`;
export const login = (userName, password) => {
    const data = {
        query: loginQuery,
        variables: { userName, password }
    }
    return axiosClient.post('/', data)
        .then(data => data?.login)
}

export const getMe = (token) => {
    const data = {
        query: getMeQuery
    }
    return axiosClient
        .post('/', data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(data => data?.me)
}
export const getAll = (token) => {
    const data = {
        query: getAllQuery
    }
    return axiosClient
        .post('/', data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(data => data?.users)
}
export const register = ({ email, password, userName, name }) => {
    const data = {
        query: registerQuery,
        variables: { email, password, userName, name }
    }
    return axiosClient
        .post('/', data)
        .then(data => data?.register)
}

export const deleteUser = (token, _id) => {
    const data = {
        query: deleteUserQuery,
        variables: { _id }
    }
    return axiosClient.post('/', data)
}