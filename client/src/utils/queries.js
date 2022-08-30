import { gql } from "apollo-server-express";

export const GET_ME = gql`
query me {
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            image
            title
            link
        }
    }
}
`