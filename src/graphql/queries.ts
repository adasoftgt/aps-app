/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getTodo = /* GraphQL */ `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
    description
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTodoQueryVariables, APITypes.GetTodoQuery>;
export const listTodos = /* GraphQL */ `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTodosQueryVariables, APITypes.ListTodosQuery>;
export const syncTodos = /* GraphQL */ `query SyncTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTodos(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncTodosQueryVariables, APITypes.SyncTodosQuery>;
export const getConfiguration = /* GraphQL */ `query GetConfiguration($id: ID!) {
  getConfiguration(id: $id) {
    id
    name
    value
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetConfigurationQueryVariables,
  APITypes.GetConfigurationQuery
>;
export const listConfigurations = /* GraphQL */ `query ListConfigurations(
  $filter: ModelConfigurationFilterInput
  $limit: Int
  $nextToken: String
) {
  listConfigurations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      value
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListConfigurationsQueryVariables,
  APITypes.ListConfigurationsQuery
>;
export const syncConfigurations = /* GraphQL */ `query SyncConfigurations(
  $filter: ModelConfigurationFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncConfigurations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      value
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncConfigurationsQueryVariables,
  APITypes.SyncConfigurationsQuery
>;
export const getRol = /* GraphQL */ `query GetRol($id: ID!) {
  getRol(id: $id) {
    id
    name
    displayname
    type
    capabilities
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetRolQueryVariables, APITypes.GetRolQuery>;
export const listRols = /* GraphQL */ `query ListRols($filter: ModelRolFilterInput, $limit: Int, $nextToken: String) {
  listRols(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      displayname
      type
      capabilities
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListRolsQueryVariables, APITypes.ListRolsQuery>;
export const syncRols = /* GraphQL */ `query SyncRols(
  $filter: ModelRolFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncRols(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      displayname
      type
      capabilities
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncRolsQueryVariables, APITypes.SyncRolsQuery>;
export const getCapability = /* GraphQL */ `query GetCapability($id: ID!) {
  getCapability(id: $id) {
    id
    name
    description
    section
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCapabilityQueryVariables,
  APITypes.GetCapabilityQuery
>;
export const listCapabilities = /* GraphQL */ `query ListCapabilities(
  $filter: ModelCapabilityFilterInput
  $limit: Int
  $nextToken: String
) {
  listCapabilities(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      section
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCapabilitiesQueryVariables,
  APITypes.ListCapabilitiesQuery
>;
export const syncCapabilities = /* GraphQL */ `query SyncCapabilities(
  $filter: ModelCapabilityFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncCapabilities(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      description
      section
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncCapabilitiesQueryVariables,
  APITypes.SyncCapabilitiesQuery
>;
export const rolsByNameAndType = /* GraphQL */ `query RolsByNameAndType(
  $name: String!
  $type: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelRolFilterInput
  $limit: Int
  $nextToken: String
) {
  rolsByNameAndType(
    name: $name
    type: $type
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      displayname
      type
      capabilities
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.RolsByNameAndTypeQueryVariables,
  APITypes.RolsByNameAndTypeQuery
>;
