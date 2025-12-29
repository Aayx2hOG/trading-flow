






import * as runtime from "@prisma/client/runtime/index-browser"

export type * from '../models.ts'
export type * from './prismaNamespace.ts'

export const Decimal = runtime.Decimal


export const NullTypes = {
  DbNull: runtime.NullTypes.DbNull as (new (secret: never) => typeof runtime.DbNull),
  JsonNull: runtime.NullTypes.JsonNull as (new (secret: never) => typeof runtime.JsonNull),
  AnyNull: runtime.NullTypes.AnyNull as (new (secret: never) => typeof runtime.AnyNull),
}

export const DbNull = runtime.DbNull


export const JsonNull = runtime.JsonNull


export const AnyNull = runtime.AnyNull


export const ModelName = {
  User: 'User',
  Workflow: 'Workflow',
  Execution: 'Execution',
  Credential: 'Credential'
} as const

export type ModelName = (typeof ModelName)[keyof typeof ModelName]



export const TransactionIsolationLevel = {
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
} as const

export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


export const UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  username: 'username',
  password: 'password'
} as const

export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


export const WorkflowScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  description: 'description',
  nodes: 'nodes',
  edges: 'edges',
  webhookUrl: 'webhookUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
} as const

export type WorkflowScalarFieldEnum = (typeof WorkflowScalarFieldEnum)[keyof typeof WorkflowScalarFieldEnum]


export const ExecutionScalarFieldEnum = {
  id: 'id',
  workflowId: 'workflowId',
  status: 'status',
  startTime: 'startTime',
  endTime: 'endTime'
} as const

export type ExecutionScalarFieldEnum = (typeof ExecutionScalarFieldEnum)[keyof typeof ExecutionScalarFieldEnum]


export const CredentialScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  type: 'type',
  encryptedData: 'encryptedData',
  iv: 'iv',
  authTag: 'authTag',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
} as const

export type CredentialScalarFieldEnum = (typeof CredentialScalarFieldEnum)[keyof typeof CredentialScalarFieldEnum]


export const SortOrder = {
  asc: 'asc',
  desc: 'desc'
} as const

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export const JsonNullValueInput = {
  JsonNull: 'JsonNull'
} as const

export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


export const QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
} as const

export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


export const JsonNullValueFilter = {
  DbNull: 'DbNull',
  JsonNull: 'JsonNull',
  AnyNull: 'AnyNull'
} as const

export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


export const NullsOrder = {
  first: 'first',
  last: 'last'
} as const

export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]

