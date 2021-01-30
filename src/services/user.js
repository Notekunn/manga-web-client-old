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
const logoutQuery = `
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
export const login = (userName, password) => {
    const data = {
        query: loginQuery,
        variables: { userName, password }
    }
    return axiosClient.post('graphql', data)
}

export const getMe = (token) => {
    const data = {
        query: getMeQuery
    }
    return axiosClient.post('graphql', data, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}
export const getAll = (token) => {
    const data = {
        query: getAllQuery
    }
    return axiosClient.post('graphql', data, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}
export const register = ({ email, password, userName, name }) => {
    const data = {
        query: logoutQuery,
        variables: { email, password, userName, name }
    }
    return axiosClient.post('graphql', data)
}