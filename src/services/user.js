import axiosClient from './axiosClient';
const loginQuery = `
mutation($userName: String!, $password: String!) {
    login(userInput: { userName: $userName, password: $password }) {
        token
        userId
        tokenExpiration
    }
}
`
export const login = (userName, password) => {
    const data = {
        query: loginQuery,
        variables: { userName, password }
    }
    return axiosClient.post('graphql', {
        data
    })
}