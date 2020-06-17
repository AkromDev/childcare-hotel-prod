import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class ChildService {
  static async update(id, data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PET_UPDATE(
          $id: String!
          $data: ChildInput!
        ) {
          childUpdate(id: $id, data: $data) {
            id
          }
        }
      `,

      variables: {
        id,
        data,
      },
    });

    return response.data.childUpdate;
  }

  static async destroyAll(ids) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PET_DESTROY($ids: [String!]!) {
          childDestroy(ids: $ids)
        }
      `,

      variables: {
        ids,
      },
    });

    return response.data.childDestroy;
  }

  static async create(data) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PET_CREATE($data: ChildInput!) {
          childCreate(data: $data) {
            id
          }
        }
      `,

      variables: {
        data,
      },
    });

    return response.data.childCreate;
  }

  static async import(values, importHash) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation PET_IMPORT(
          $data: ChildInput!
          $importHash: String!
        ) {
          childImport(data: $data, importHash: $importHash)
        }
      `,

      variables: {
        data: values,
        importHash,
      },
    });

    return response.data.childImport;
  }

  static async find(id) {
    const response = await graphqlClient.query({
      query: gql`
        query PET_FIND($id: String!) {
          childFind(id: $id) {
            id
            owner {
              id
              fullName
              email
            }
            name
            type
            # breed
            size
            bookings {
              id
              arrival
              departure
              status
            }
            createdAt
            updatedAt
          }
        }
      `,

      variables: {
        id,
      },
    });

    return response.data.childFind;
  }

  static async list(filter, orderBy, limit, offset) {
    const response = await graphqlClient.query({
      query: gql`
        query PET_LIST(
          $filter: ChildFilterInput
          $orderBy: ChildOrderByEnum
          $limit: Int
          $offset: Int
        ) {
          childList(
            filter: $filter
            orderBy: $orderBy
            limit: $limit
            offset: $offset
          ) {
            count
            rows {
              id
              owner {
                id
                fullName
                email
              }
              name
              type
              # breed
              size
              updatedAt
              createdAt
            }
          }
        }
      `,

      variables: {
        filter,
        orderBy,
        limit,
        offset,
      },
    });

    return response.data.childList;
  }

  static async listAutocomplete(query, owner, limit) {
    const response = await graphqlClient.query({
      query: gql`
        query PET_AUTOCOMPLETE(
          $query: String
          $owner: String
          $limit: Int
        ) {
          childAutocomplete(
            query: $query
            owner: $owner
            limit: $limit
          ) {
            id
            label
          }
        }
      `,

      variables: {
        query,
        owner,
        limit,
      },
    });

    return response.data.childAutocomplete;
  }

  static async exists() {
    const { count } = await this.list(null, null, 1, null);
    return count > 0;
  }
}
