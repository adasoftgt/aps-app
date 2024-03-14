/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateTodo = /* GraphQL */ `subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
  onCreateTodo(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTodoSubscriptionVariables,
  APITypes.OnCreateTodoSubscription
>;
export const onUpdateTodo = /* GraphQL */ `subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
  onUpdateTodo(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTodoSubscriptionVariables,
  APITypes.OnUpdateTodoSubscription
>;
export const onDeleteTodo = /* GraphQL */ `subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
  onDeleteTodo(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTodoSubscriptionVariables,
  APITypes.OnDeleteTodoSubscription
>;
export const onCreateConfiguration = /* GraphQL */ `subscription OnCreateConfiguration(
  $filter: ModelSubscriptionConfigurationFilterInput
) {
  onCreateConfiguration(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateConfigurationSubscriptionVariables,
  APITypes.OnCreateConfigurationSubscription
>;
export const onUpdateConfiguration = /* GraphQL */ `subscription OnUpdateConfiguration(
  $filter: ModelSubscriptionConfigurationFilterInput
) {
  onUpdateConfiguration(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateConfigurationSubscriptionVariables,
  APITypes.OnUpdateConfigurationSubscription
>;
export const onDeleteConfiguration = /* GraphQL */ `subscription OnDeleteConfiguration(
  $filter: ModelSubscriptionConfigurationFilterInput
) {
  onDeleteConfiguration(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteConfigurationSubscriptionVariables,
  APITypes.OnDeleteConfigurationSubscription
>;
export const onCreateRol = /* GraphQL */ `subscription OnCreateRol($filter: ModelSubscriptionRolFilterInput) {
  onCreateRol(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateRolSubscriptionVariables,
  APITypes.OnCreateRolSubscription
>;
export const onUpdateRol = /* GraphQL */ `subscription OnUpdateRol($filter: ModelSubscriptionRolFilterInput) {
  onUpdateRol(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRolSubscriptionVariables,
  APITypes.OnUpdateRolSubscription
>;
export const onDeleteRol = /* GraphQL */ `subscription OnDeleteRol($filter: ModelSubscriptionRolFilterInput) {
  onDeleteRol(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteRolSubscriptionVariables,
  APITypes.OnDeleteRolSubscription
>;
export const onCreateCapability = /* GraphQL */ `subscription OnCreateCapability(
  $filter: ModelSubscriptionCapabilityFilterInput
) {
  onCreateCapability(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCapabilitySubscriptionVariables,
  APITypes.OnCreateCapabilitySubscription
>;
export const onUpdateCapability = /* GraphQL */ `subscription OnUpdateCapability(
  $filter: ModelSubscriptionCapabilityFilterInput
) {
  onUpdateCapability(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCapabilitySubscriptionVariables,
  APITypes.OnUpdateCapabilitySubscription
>;
export const onDeleteCapability = /* GraphQL */ `subscription OnDeleteCapability(
  $filter: ModelSubscriptionCapabilityFilterInput
) {
  onDeleteCapability(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCapabilitySubscriptionVariables,
  APITypes.OnDeleteCapabilitySubscription
>;
