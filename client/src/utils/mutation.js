import { gql } from 'apollo-server-express'

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addProfile(username: $username, email: $email, password: $password)
        token
        user {
            _id
            username
        }
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook($book: InputBook!) {
        savebook(book: $book) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`

export const REMOVE_BOOK = gql`
    mutatuion removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            savedBook {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`