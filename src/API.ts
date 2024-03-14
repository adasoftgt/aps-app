/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodoInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  _version?: number | null,
};

export type ModelTodoConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Todo = {
  __typename: "Todo",
  id: string,
  name: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateTodoInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  _version?: number | null,
};

export type DeleteTodoInput = {
  id: string,
  _version?: number | null,
};

export type CreateConfigurationInput = {
  id?: string | null,
  name: string,
  value: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  _version?: number | null,
};

export type ModelConfigurationConditionInput = {
  name?: ModelStringInput | null,
  value?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelConfigurationConditionInput | null > | null,
  or?: Array< ModelConfigurationConditionInput | null > | null,
  not?: ModelConfigurationConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type Configuration = {
  __typename: "Configuration",
  id: string,
  name: string,
  value: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateConfigurationInput = {
  id: string,
  name?: string | null,
  value?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  _version?: number | null,
};

export type DeleteConfigurationInput = {
  id: string,
  _version?: number | null,
};

export type CreateRolInput = {
  id?: string | null,
  name: string,
  displayname: string,
  type: string,
  capabilities: Array< string >,
  _version?: number | null,
};

export type ModelRolConditionInput = {
  name?: ModelStringInput | null,
  displayname?: ModelStringInput | null,
  type?: ModelStringInput | null,
  capabilities?: ModelStringInput | null,
  and?: Array< ModelRolConditionInput | null > | null,
  or?: Array< ModelRolConditionInput | null > | null,
  not?: ModelRolConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type Rol = {
  __typename: "Rol",
  id: string,
  name: string,
  displayname: string,
  type: string,
  capabilities: Array< string >,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateRolInput = {
  id: string,
  name?: string | null,
  displayname?: string | null,
  type?: string | null,
  capabilities?: Array< string > | null,
  _version?: number | null,
};

export type DeleteRolInput = {
  id: string,
  _version?: number | null,
};

export type CreateCapabilityInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  section?: string | null,
  _version?: number | null,
};

export type ModelCapabilityConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  section?: ModelStringInput | null,
  and?: Array< ModelCapabilityConditionInput | null > | null,
  or?: Array< ModelCapabilityConditionInput | null > | null,
  not?: ModelCapabilityConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type Capability = {
  __typename: "Capability",
  id: string,
  name: string,
  description?: string | null,
  section?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateCapabilityInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  section?: string | null,
  _version?: number | null,
};

export type DeleteCapabilityInput = {
  id: string,
  _version?: number | null,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items:  Array<Todo | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelConfigurationFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  value?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelConfigurationFilterInput | null > | null,
  or?: Array< ModelConfigurationFilterInput | null > | null,
  not?: ModelConfigurationFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelConfigurationConnection = {
  __typename: "ModelConfigurationConnection",
  items:  Array<Configuration | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelRolFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  displayname?: ModelStringInput | null,
  type?: ModelStringInput | null,
  capabilities?: ModelStringInput | null,
  and?: Array< ModelRolFilterInput | null > | null,
  or?: Array< ModelRolFilterInput | null > | null,
  not?: ModelRolFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelRolConnection = {
  __typename: "ModelRolConnection",
  items:  Array<Rol | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelCapabilityFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  section?: ModelStringInput | null,
  and?: Array< ModelCapabilityFilterInput | null > | null,
  or?: Array< ModelCapabilityFilterInput | null > | null,
  not?: ModelCapabilityFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelCapabilityConnection = {
  __typename: "ModelCapabilityConnection",
  items:  Array<Capability | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionTodoFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTodoFilterInput | null > | null,
  or?: Array< ModelSubscriptionTodoFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionConfigurationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  value?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionConfigurationFilterInput | null > | null,
  or?: Array< ModelSubscriptionConfigurationFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionRolFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  displayname?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  capabilities?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRolFilterInput | null > | null,
  or?: Array< ModelSubscriptionRolFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionCapabilityFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  section?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCapabilityFilterInput | null > | null,
  or?: Array< ModelSubscriptionCapabilityFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateConfigurationMutationVariables = {
  input: CreateConfigurationInput,
  condition?: ModelConfigurationConditionInput | null,
};

export type CreateConfigurationMutation = {
  createConfiguration?:  {
    __typename: "Configuration",
    id: string,
    name: string,
    value: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateConfigurationMutationVariables = {
  input: UpdateConfigurationInput,
  condition?: ModelConfigurationConditionInput | null,
};

export type UpdateConfigurationMutation = {
  updateConfiguration?:  {
    __typename: "Configuration",
    id: string,
    name: string,
    value: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteConfigurationMutationVariables = {
  input: DeleteConfigurationInput,
  condition?: ModelConfigurationConditionInput | null,
};

export type DeleteConfigurationMutation = {
  deleteConfiguration?:  {
    __typename: "Configuration",
    id: string,
    name: string,
    value: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateRolMutationVariables = {
  input: CreateRolInput,
  condition?: ModelRolConditionInput | null,
};

export type CreateRolMutation = {
  createRol?:  {
    __typename: "Rol",
    id: string,
    name: string,
    displayname: string,
    type: string,
    capabilities: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateRolMutationVariables = {
  input: UpdateRolInput,
  condition?: ModelRolConditionInput | null,
};

export type UpdateRolMutation = {
  updateRol?:  {
    __typename: "Rol",
    id: string,
    name: string,
    displayname: string,
    type: string,
    capabilities: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteRolMutationVariables = {
  input: DeleteRolInput,
  condition?: ModelRolConditionInput | null,
};

export type DeleteRolMutation = {
  deleteRol?:  {
    __typename: "Rol",
    id: string,
    name: string,
    displayname: string,
    type: string,
    capabilities: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateCapabilityMutationVariables = {
  input: CreateCapabilityInput,
  condition?: ModelCapabilityConditionInput | null,
};

export type CreateCapabilityMutation = {
  createCapability?:  {
    __typename: "Capability",
    id: string,
    name: string,
    description?: string | null,
    section?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateCapabilityMutationVariables = {
  input: UpdateCapabilityInput,
  condition?: ModelCapabilityConditionInput | null,
};

export type UpdateCapabilityMutation = {
  updateCapability?:  {
    __typename: "Capability",
    id: string,
    name: string,
    description?: string | null,
    section?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteCapabilityMutationVariables = {
  input: DeleteCapabilityInput,
  condition?: ModelCapabilityConditionInput | null,
};

export type DeleteCapabilityMutation = {
  deleteCapability?:  {
    __typename: "Capability",
    id: string,
    name: string,
    description?: string | null,
    section?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncTodosQuery = {
  syncTodos?:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetConfigurationQueryVariables = {
  id: string,
};

export type GetConfigurationQuery = {
  getConfiguration?:  {
    __typename: "Configuration",
    id: string,
    name: string,
    value: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListConfigurationsQueryVariables = {
  filter?: ModelConfigurationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConfigurationsQuery = {
  listConfigurations?:  {
    __typename: "ModelConfigurationConnection",
    items:  Array< {
      __typename: "Configuration",
      id: string,
      name: string,
      value: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncConfigurationsQueryVariables = {
  filter?: ModelConfigurationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncConfigurationsQuery = {
  syncConfigurations?:  {
    __typename: "ModelConfigurationConnection",
    items:  Array< {
      __typename: "Configuration",
      id: string,
      name: string,
      value: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetRolQueryVariables = {
  id: string,
};

export type GetRolQuery = {
  getRol?:  {
    __typename: "Rol",
    id: string,
    name: string,
    displayname: string,
    type: string,
    capabilities: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListRolsQueryVariables = {
  filter?: ModelRolFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRolsQuery = {
  listRols?:  {
    __typename: "ModelRolConnection",
    items:  Array< {
      __typename: "Rol",
      id: string,
      name: string,
      displayname: string,
      type: string,
      capabilities: Array< string >,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncRolsQueryVariables = {
  filter?: ModelRolFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncRolsQuery = {
  syncRols?:  {
    __typename: "ModelRolConnection",
    items:  Array< {
      __typename: "Rol",
      id: string,
      name: string,
      displayname: string,
      type: string,
      capabilities: Array< string >,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetCapabilityQueryVariables = {
  id: string,
};

export type GetCapabilityQuery = {
  getCapability?:  {
    __typename: "Capability",
    id: string,
    name: string,
    description?: string | null,
    section?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListCapabilitiesQueryVariables = {
  filter?: ModelCapabilityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCapabilitiesQuery = {
  listCapabilities?:  {
    __typename: "ModelCapabilityConnection",
    items:  Array< {
      __typename: "Capability",
      id: string,
      name: string,
      description?: string | null,
      section?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncCapabilitiesQueryVariables = {
  filter?: ModelCapabilityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncCapabilitiesQuery = {
  syncCapabilities?:  {
    __typename: "ModelCapabilityConnection",
    items:  Array< {
      __typename: "Capability",
      id: string,
      name: string,
      description?: string | null,
      section?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type RolsByNameAndTypeQueryVariables = {
  name: string,
  type?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRolFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RolsByNameAndTypeQuery = {
  rolsByNameAndType?:  {
    __typename: "ModelRolConnection",
    items:  Array< {
      __typename: "Rol",
      id: string,
      name: string,
      displayname: string,
      type: string,
      capabilities: Array< string >,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateConfigurationSubscriptionVariables = {
  filter?: ModelSubscriptionConfigurationFilterInput | null,
};

export type OnCreateConfigurationSubscription = {
  onCreateConfiguration?:  {
    __typename: "Configuration",
    id: string,
    name: string,
    value: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateConfigurationSubscriptionVariables = {
  filter?: ModelSubscriptionConfigurationFilterInput | null,
};

export type OnUpdateConfigurationSubscription = {
  onUpdateConfiguration?:  {
    __typename: "Configuration",
    id: string,
    name: string,
    value: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteConfigurationSubscriptionVariables = {
  filter?: ModelSubscriptionConfigurationFilterInput | null,
};

export type OnDeleteConfigurationSubscription = {
  onDeleteConfiguration?:  {
    __typename: "Configuration",
    id: string,
    name: string,
    value: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateRolSubscriptionVariables = {
  filter?: ModelSubscriptionRolFilterInput | null,
};

export type OnCreateRolSubscription = {
  onCreateRol?:  {
    __typename: "Rol",
    id: string,
    name: string,
    displayname: string,
    type: string,
    capabilities: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateRolSubscriptionVariables = {
  filter?: ModelSubscriptionRolFilterInput | null,
};

export type OnUpdateRolSubscription = {
  onUpdateRol?:  {
    __typename: "Rol",
    id: string,
    name: string,
    displayname: string,
    type: string,
    capabilities: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteRolSubscriptionVariables = {
  filter?: ModelSubscriptionRolFilterInput | null,
};

export type OnDeleteRolSubscription = {
  onDeleteRol?:  {
    __typename: "Rol",
    id: string,
    name: string,
    displayname: string,
    type: string,
    capabilities: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateCapabilitySubscriptionVariables = {
  filter?: ModelSubscriptionCapabilityFilterInput | null,
};

export type OnCreateCapabilitySubscription = {
  onCreateCapability?:  {
    __typename: "Capability",
    id: string,
    name: string,
    description?: string | null,
    section?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateCapabilitySubscriptionVariables = {
  filter?: ModelSubscriptionCapabilityFilterInput | null,
};

export type OnUpdateCapabilitySubscription = {
  onUpdateCapability?:  {
    __typename: "Capability",
    id: string,
    name: string,
    description?: string | null,
    section?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteCapabilitySubscriptionVariables = {
  filter?: ModelSubscriptionCapabilityFilterInput | null,
};

export type OnDeleteCapabilitySubscription = {
  onDeleteCapability?:  {
    __typename: "Capability",
    id: string,
    name: string,
    description?: string | null,
    section?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
