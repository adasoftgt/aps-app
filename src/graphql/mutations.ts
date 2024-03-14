/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createTodo = /* GraphQL */ `mutation CreateTodo(
  $input: CreateTodoInput!
  $condition: ModelTodoConditionInput
) {
  createTodo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTodoMutationVariables,
  APITypes.CreateTodoMutation
>;
export const updateTodo = /* GraphQL */ `mutation UpdateTodo(
  $input: UpdateTodoInput!
  $condition: ModelTodoConditionInput
) {
  updateTodo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTodoMutationVariables,
  APITypes.UpdateTodoMutation
>;
export const deleteTodo = /* GraphQL */ `mutation DeleteTodo(
  $input: DeleteTodoInput!
  $condition: ModelTodoConditionInput
) {
  deleteTodo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTodoMutationVariables,
  APITypes.DeleteTodoMutation
>;
export const createConfiguration = /* GraphQL */ `mutation CreateConfiguration(
  $input: CreateConfigurationInput!
  $condition: ModelConfigurationConditionInput
) {
  createConfiguration(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateConfigurationMutationVariables,
  APITypes.CreateConfigurationMutation
>;
export const updateConfiguration = /* GraphQL */ `mutation UpdateConfiguration(
  $input: UpdateConfigurationInput!
  $condition: ModelConfigurationConditionInput
) {
  updateConfiguration(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateConfigurationMutationVariables,
  APITypes.UpdateConfigurationMutation
>;
export const deleteConfiguration = /* GraphQL */ `mutation DeleteConfiguration(
  $input: DeleteConfigurationInput!
  $condition: ModelConfigurationConditionInput
) {
  deleteConfiguration(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteConfigurationMutationVariables,
  APITypes.DeleteConfigurationMutation
>;
export const createRol = /* GraphQL */ `mutation CreateRol(
  $input: CreateRolInput!
  $condition: ModelRolConditionInput
) {
  createRol(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateRolMutationVariables,
  APITypes.CreateRolMutation
>;
export const updateRol = /* GraphQL */ `mutation UpdateRol(
  $input: UpdateRolInput!
  $condition: ModelRolConditionInput
) {
  updateRol(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateRolMutationVariables,
  APITypes.UpdateRolMutation
>;
export const deleteRol = /* GraphQL */ `mutation DeleteRol(
  $input: DeleteRolInput!
  $condition: ModelRolConditionInput
) {
  deleteRol(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteRolMutationVariables,
  APITypes.DeleteRolMutation
>;
export const createCapability = /* GraphQL */ `mutation CreateCapability(
  $input: CreateCapabilityInput!
  $condition: ModelCapabilityConditionInput
) {
  createCapability(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCapabilityMutationVariables,
  APITypes.CreateCapabilityMutation
>;
export const updateCapability = /* GraphQL */ `mutation UpdateCapability(
  $input: UpdateCapabilityInput!
  $condition: ModelCapabilityConditionInput
) {
  updateCapability(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCapabilityMutationVariables,
  APITypes.UpdateCapabilityMutation
>;
export const deleteCapability = /* GraphQL */ `mutation DeleteCapability(
  $input: DeleteCapabilityInput!
  $condition: ModelCapabilityConditionInput
) {
  deleteCapability(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCapabilityMutationVariables,
  APITypes.DeleteCapabilityMutation
>;
