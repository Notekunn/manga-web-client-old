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