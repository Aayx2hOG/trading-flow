





import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums.ts"
import type * as Prisma from "../internal/prismaNamespace.ts"


export type WorkflowModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkflowPayload>

export type AggregateWorkflow = {
  _count: WorkflowCountAggregateOutputType | null
  _min: WorkflowMinAggregateOutputType | null
  _max: WorkflowMaxAggregateOutputType | null
}

export type WorkflowMinAggregateOutputType = {
  id: string | null
  userId: string | null
  name: string | null
  description: string | null
  webhookUrl: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type WorkflowMaxAggregateOutputType = {
  id: string | null
  userId: string | null
  name: string | null
  description: string | null
  webhookUrl: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type WorkflowCountAggregateOutputType = {
  id: number
  userId: number
  name: number
  description: number
  nodes: number
  edges: number
  webhookUrl: number
  createdAt: number
  updatedAt: number
  _all: number
}


export type WorkflowMinAggregateInputType = {
  id?: true
  userId?: true
  name?: true
  description?: true
  webhookUrl?: true
  createdAt?: true
  updatedAt?: true
}

export type WorkflowMaxAggregateInputType = {
  id?: true
  userId?: true
  name?: true
  description?: true
  webhookUrl?: true
  createdAt?: true
  updatedAt?: true
}

export type WorkflowCountAggregateInputType = {
  id?: true
  userId?: true
  name?: true
  description?: true
  nodes?: true
  edges?: true
  webhookUrl?: true
  createdAt?: true
  updatedAt?: true
  _all?: true
}

export type WorkflowAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  where?: Prisma.WorkflowWhereInput
  
  orderBy?: Prisma.WorkflowOrderByWithRelationInput | Prisma.WorkflowOrderByWithRelationInput[]
  
  cursor?: Prisma.WorkflowWhereUniqueInput
  
  take?: number
  
  skip?: number
  
  _count?: true | WorkflowCountAggregateInputType
  
  _min?: WorkflowMinAggregateInputType
  
  _max?: WorkflowMaxAggregateInputType
}

export type GetWorkflowAggregateType<T extends WorkflowAggregateArgs> = {
      [P in keyof T & keyof AggregateWorkflow]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateWorkflow[P]>
    : Prisma.GetScalarType<T[P], AggregateWorkflow[P]>
}




export type WorkflowGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.WorkflowWhereInput
  orderBy?: Prisma.WorkflowOrderByWithAggregationInput | Prisma.WorkflowOrderByWithAggregationInput[]
  by: Prisma.WorkflowScalarFieldEnum[] | Prisma.WorkflowScalarFieldEnum
  having?: Prisma.WorkflowScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: WorkflowCountAggregateInputType | true
  _min?: WorkflowMinAggregateInputType
  _max?: WorkflowMaxAggregateInputType
}

export type WorkflowGroupByOutputType = {
  id: string
  userId: string
  name: string
  description: string | null
  nodes: runtime.JsonValue
  edges: runtime.JsonValue
  webhookUrl: string | null
  createdAt: Date
  updatedAt: Date
  _count: WorkflowCountAggregateOutputType | null
  _min: WorkflowMinAggregateOutputType | null
  _max: WorkflowMaxAggregateOutputType | null
}

type GetWorkflowGroupByPayload<T extends WorkflowGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<WorkflowGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof WorkflowGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], WorkflowGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], WorkflowGroupByOutputType[P]>
      }
    >
  >



export type WorkflowWhereInput = {
  AND?: Prisma.WorkflowWhereInput | Prisma.WorkflowWhereInput[]
  OR?: Prisma.WorkflowWhereInput[]
  NOT?: Prisma.WorkflowWhereInput | Prisma.WorkflowWhereInput[]
  id?: Prisma.StringFilter<"Workflow"> | string
  userId?: Prisma.StringFilter<"Workflow"> | string
  name?: Prisma.StringFilter<"Workflow"> | string
  description?: Prisma.StringNullableFilter<"Workflow"> | string | null
  nodes?: Prisma.JsonFilter<"Workflow">
  edges?: Prisma.JsonFilter<"Workflow">
  webhookUrl?: Prisma.StringNullableFilter<"Workflow"> | string | null
  createdAt?: Prisma.DateTimeFilter<"Workflow"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Workflow"> | Date | string
  user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>
  executions?: Prisma.ExecutionListRelationFilter
}

export type WorkflowOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  description?: Prisma.SortOrderInput | Prisma.SortOrder
  nodes?: Prisma.SortOrder
  edges?: Prisma.SortOrder
  webhookUrl?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  user?: Prisma.UserOrderByWithRelationInput
  executions?: Prisma.ExecutionOrderByRelationAggregateInput
}

export type WorkflowWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  webhookUrl?: string
  AND?: Prisma.WorkflowWhereInput | Prisma.WorkflowWhereInput[]
  OR?: Prisma.WorkflowWhereInput[]
  NOT?: Prisma.WorkflowWhereInput | Prisma.WorkflowWhereInput[]
  userId?: Prisma.StringFilter<"Workflow"> | string
  name?: Prisma.StringFilter<"Workflow"> | string
  description?: Prisma.StringNullableFilter<"Workflow"> | string | null
  nodes?: Prisma.JsonFilter<"Workflow">
  edges?: Prisma.JsonFilter<"Workflow">
  createdAt?: Prisma.DateTimeFilter<"Workflow"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Workflow"> | Date | string
  user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>
  executions?: Prisma.ExecutionListRelationFilter
}, "id" | "webhookUrl">

export type WorkflowOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  description?: Prisma.SortOrderInput | Prisma.SortOrder
  nodes?: Prisma.SortOrder
  edges?: Prisma.SortOrder
  webhookUrl?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  _count?: Prisma.WorkflowCountOrderByAggregateInput
  _max?: Prisma.WorkflowMaxOrderByAggregateInput
  _min?: Prisma.WorkflowMinOrderByAggregateInput
}

export type WorkflowScalarWhereWithAggregatesInput = {
  AND?: Prisma.WorkflowScalarWhereWithAggregatesInput | Prisma.WorkflowScalarWhereWithAggregatesInput[]
  OR?: Prisma.WorkflowScalarWhereWithAggregatesInput[]
  NOT?: Prisma.WorkflowScalarWhereWithAggregatesInput | Prisma.WorkflowScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"Workflow"> | string
  userId?: Prisma.StringWithAggregatesFilter<"Workflow"> | string
  name?: Prisma.StringWithAggregatesFilter<"Workflow"> | string
  description?: Prisma.StringNullableWithAggregatesFilter<"Workflow"> | string | null
  nodes?: Prisma.JsonWithAggregatesFilter<"Workflow">
  edges?: Prisma.JsonWithAggregatesFilter<"Workflow">
  webhookUrl?: Prisma.StringNullableWithAggregatesFilter<"Workflow"> | string | null
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"Workflow"> | Date | string
  updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Workflow"> | Date | string
}

export type WorkflowCreateInput = {
  id?: string
  name?: string
  description?: string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  user: Prisma.UserCreateNestedOneWithoutWorkflowsInput
  executions?: Prisma.ExecutionCreateNestedManyWithoutWorkflowInput
}

export type WorkflowUncheckedCreateInput = {
  id?: string
  userId: string
  name?: string
  description?: string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  executions?: Prisma.ExecutionUncheckedCreateNestedManyWithoutWorkflowInput
}

export type WorkflowUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  user?: Prisma.UserUpdateOneRequiredWithoutWorkflowsNestedInput
  executions?: Prisma.ExecutionUpdateManyWithoutWorkflowNestedInput
}

export type WorkflowUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  executions?: Prisma.ExecutionUncheckedUpdateManyWithoutWorkflowNestedInput
}

export type WorkflowCreateManyInput = {
  id?: string
  userId: string
  name?: string
  description?: string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type WorkflowUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type WorkflowUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type WorkflowListRelationFilter = {
  every?: Prisma.WorkflowWhereInput
  some?: Prisma.WorkflowWhereInput
  none?: Prisma.WorkflowWhereInput
}

export type WorkflowOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type WorkflowCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  description?: Prisma.SortOrder
  nodes?: Prisma.SortOrder
  edges?: Prisma.SortOrder
  webhookUrl?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type WorkflowMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  description?: Prisma.SortOrder
  webhookUrl?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type WorkflowMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  description?: Prisma.SortOrder
  webhookUrl?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type WorkflowScalarRelationFilter = {
  is?: Prisma.WorkflowWhereInput
  isNot?: Prisma.WorkflowWhereInput
}

export type WorkflowCreateNestedManyWithoutUserInput = {
  create?: Prisma.XOR<Prisma.WorkflowCreateWithoutUserInput, Prisma.WorkflowUncheckedCreateWithoutUserInput> | Prisma.WorkflowCreateWithoutUserInput[] | Prisma.WorkflowUncheckedCreateWithoutUserInput[]
  connectOrCreate?: Prisma.WorkflowCreateOrConnectWithoutUserInput | Prisma.WorkflowCreateOrConnectWithoutUserInput[]
  createMany?: Prisma.WorkflowCreateManyUserInputEnvelope
  connect?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[]
}

export type WorkflowUncheckedCreateNestedManyWithoutUserInput = {
  create?: Prisma.XOR<Prisma.WorkflowCreateWithoutUserInput, Prisma.WorkflowUncheckedCreateWithoutUserInput> | Prisma.WorkflowCreateWithoutUserInput[] | Prisma.WorkflowUncheckedCreateWithoutUserInput[]
  connectOrCreate?: Prisma.WorkflowCreateOrConnectWithoutUserInput | Prisma.WorkflowCreateOrConnectWithoutUserInput[]
  createMany?: Prisma.WorkflowCreateManyUserInputEnvelope
  connect?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[]
}

export type WorkflowUpdateManyWithoutUserNestedInput = {
  create?: Prisma.XOR<Prisma.WorkflowCreateWithoutUserInput, Prisma.WorkflowUncheckedCreateWithoutUserInput> | Prisma.WorkflowCreateWithoutUserInput[] | Prisma.WorkflowUncheckedCreateWithoutUserInput[]
  connectOrCreate?: Prisma.WorkflowCreateOrConnectWithoutUserInput | Prisma.WorkflowCreateOrConnectWithoutUserInput[]
  upsert?: Prisma.WorkflowUpsertWithWhereUniqueWithoutUserInput | Prisma.WorkflowUpsertWithWhereUniqueWithoutUserInput[]
  createMany?: Prisma.WorkflowCreateManyUserInputEnvelope
  set?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[]
  disconnect?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[]
  delete?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[]
  connect?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[]
  update?: Prisma.WorkflowUpdateWithWhereUniqueWithoutUserInput | Prisma.WorkflowUpdateWithWhereUniqueWithoutUserInput[]
  updateMany?: Prisma.WorkflowUpdateManyWithWhereWithoutUserInput | Prisma.WorkflowUpdateManyWithWhereWithoutUserInput[]
  deleteMany?: Prisma.WorkflowScalarWhereInput | Prisma.WorkflowScalarWhereInput[]
}

export type WorkflowUncheckedUpdateManyWithoutUserNestedInput = {
  create?: Prisma.XOR<Prisma.WorkflowCreateWithoutUserInput, Prisma.WorkflowUncheckedCreateWithoutUserInput> | Prisma.WorkflowCreateWithoutUserInput[] | Prisma.WorkflowUncheckedCreateWithoutUserInput[]
  connectOrCreate?: Prisma.WorkflowCreateOrConnectWithoutUserInput | Prisma.WorkflowCreateOrConnectWithoutUserInput[]
  upsert?: Prisma.WorkflowUpsertWithWhereUniqueWithoutUserInput | Prisma.WorkflowUpsertWithWhereUniqueWithoutUserInput[]
  createMany?: Prisma.WorkflowCreateManyUserInputEnvelope
  set?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[]
  disconnect?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[]
  delete?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[]
  connect?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[]
  update?: Prisma.WorkflowUpdateWithWhereUniqueWithoutUserInput | Prisma.WorkflowUpdateWithWhereUniqueWithoutUserInput[]
  updateMany?: Prisma.WorkflowUpdateManyWithWhereWithoutUserInput | Prisma.WorkflowUpdateManyWithWhereWithoutUserInput[]
  deleteMany?: Prisma.WorkflowScalarWhereInput | Prisma.WorkflowScalarWhereInput[]
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type WorkflowCreateNestedOneWithoutExecutionsInput = {
  create?: Prisma.XOR<Prisma.WorkflowCreateWithoutExecutionsInput, Prisma.WorkflowUncheckedCreateWithoutExecutionsInput>
  connectOrCreate?: Prisma.WorkflowCreateOrConnectWithoutExecutionsInput
  connect?: Prisma.WorkflowWhereUniqueInput
}

export type WorkflowUpdateOneRequiredWithoutExecutionsNestedInput = {
  create?: Prisma.XOR<Prisma.WorkflowCreateWithoutExecutionsInput, Prisma.WorkflowUncheckedCreateWithoutExecutionsInput>
  connectOrCreate?: Prisma.WorkflowCreateOrConnectWithoutExecutionsInput
  upsert?: Prisma.WorkflowUpsertWithoutExecutionsInput
  connect?: Prisma.WorkflowWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.WorkflowUpdateToOneWithWhereWithoutExecutionsInput, Prisma.WorkflowUpdateWithoutExecutionsInput>, Prisma.WorkflowUncheckedUpdateWithoutExecutionsInput>
}

export type WorkflowCreateWithoutUserInput = {
  id?: string
  name?: string
  description?: string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  executions?: Prisma.ExecutionCreateNestedManyWithoutWorkflowInput
}

export type WorkflowUncheckedCreateWithoutUserInput = {
  id?: string
  name?: string
  description?: string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  executions?: Prisma.ExecutionUncheckedCreateNestedManyWithoutWorkflowInput
}

export type WorkflowCreateOrConnectWithoutUserInput = {
  where: Prisma.WorkflowWhereUniqueInput
  create: Prisma.XOR<Prisma.WorkflowCreateWithoutUserInput, Prisma.WorkflowUncheckedCreateWithoutUserInput>
}

export type WorkflowCreateManyUserInputEnvelope = {
  data: Prisma.WorkflowCreateManyUserInput | Prisma.WorkflowCreateManyUserInput[]
  skipDuplicates?: boolean
}

export type WorkflowUpsertWithWhereUniqueWithoutUserInput = {
  where: Prisma.WorkflowWhereUniqueInput
  update: Prisma.XOR<Prisma.WorkflowUpdateWithoutUserInput, Prisma.WorkflowUncheckedUpdateWithoutUserInput>
  create: Prisma.XOR<Prisma.WorkflowCreateWithoutUserInput, Prisma.WorkflowUncheckedCreateWithoutUserInput>
}

export type WorkflowUpdateWithWhereUniqueWithoutUserInput = {
  where: Prisma.WorkflowWhereUniqueInput
  data: Prisma.XOR<Prisma.WorkflowUpdateWithoutUserInput, Prisma.WorkflowUncheckedUpdateWithoutUserInput>
}

export type WorkflowUpdateManyWithWhereWithoutUserInput = {
  where: Prisma.WorkflowScalarWhereInput
  data: Prisma.XOR<Prisma.WorkflowUpdateManyMutationInput, Prisma.WorkflowUncheckedUpdateManyWithoutUserInput>
}

export type WorkflowScalarWhereInput = {
  AND?: Prisma.WorkflowScalarWhereInput | Prisma.WorkflowScalarWhereInput[]
  OR?: Prisma.WorkflowScalarWhereInput[]
  NOT?: Prisma.WorkflowScalarWhereInput | Prisma.WorkflowScalarWhereInput[]
  id?: Prisma.StringFilter<"Workflow"> | string
  userId?: Prisma.StringFilter<"Workflow"> | string
  name?: Prisma.StringFilter<"Workflow"> | string
  description?: Prisma.StringNullableFilter<"Workflow"> | string | null
  nodes?: Prisma.JsonFilter<"Workflow">
  edges?: Prisma.JsonFilter<"Workflow">
  webhookUrl?: Prisma.StringNullableFilter<"Workflow"> | string | null
  createdAt?: Prisma.DateTimeFilter<"Workflow"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Workflow"> | Date | string
}

export type WorkflowCreateWithoutExecutionsInput = {
  id?: string
  name?: string
  description?: string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  user: Prisma.UserCreateNestedOneWithoutWorkflowsInput
}

export type WorkflowUncheckedCreateWithoutExecutionsInput = {
  id?: string
  userId: string
  name?: string
  description?: string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type WorkflowCreateOrConnectWithoutExecutionsInput = {
  where: Prisma.WorkflowWhereUniqueInput
  create: Prisma.XOR<Prisma.WorkflowCreateWithoutExecutionsInput, Prisma.WorkflowUncheckedCreateWithoutExecutionsInput>
}

export type WorkflowUpsertWithoutExecutionsInput = {
  update: Prisma.XOR<Prisma.WorkflowUpdateWithoutExecutionsInput, Prisma.WorkflowUncheckedUpdateWithoutExecutionsInput>
  create: Prisma.XOR<Prisma.WorkflowCreateWithoutExecutionsInput, Prisma.WorkflowUncheckedCreateWithoutExecutionsInput>
  where?: Prisma.WorkflowWhereInput
}

export type WorkflowUpdateToOneWithWhereWithoutExecutionsInput = {
  where?: Prisma.WorkflowWhereInput
  data: Prisma.XOR<Prisma.WorkflowUpdateWithoutExecutionsInput, Prisma.WorkflowUncheckedUpdateWithoutExecutionsInput>
}

export type WorkflowUpdateWithoutExecutionsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  user?: Prisma.UserUpdateOneRequiredWithoutWorkflowsNestedInput
}

export type WorkflowUncheckedUpdateWithoutExecutionsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type WorkflowCreateManyUserInput = {
  id?: string
  name?: string
  description?: string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type WorkflowUpdateWithoutUserInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  executions?: Prisma.ExecutionUpdateManyWithoutWorkflowNestedInput
}

export type WorkflowUncheckedUpdateWithoutUserInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  executions?: Prisma.ExecutionUncheckedUpdateManyWithoutWorkflowNestedInput
}

export type WorkflowUncheckedUpdateManyWithoutUserInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  nodes?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  edges?: Prisma.JsonNullValueInput | runtime.InputJsonValue
  webhookUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}




export type WorkflowCountOutputType = {
  executions: number
}

export type WorkflowCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  executions?: boolean | WorkflowCountOutputTypeCountExecutionsArgs
}


export type WorkflowCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.WorkflowCountOutputTypeSelect<ExtArgs> | null
}


export type WorkflowCountOutputTypeCountExecutionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.ExecutionWhereInput
}


export type WorkflowSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  userId?: boolean
  name?: boolean
  description?: boolean
  nodes?: boolean
  edges?: boolean
  webhookUrl?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
  executions?: boolean | Prisma.Workflow$executionsArgs<ExtArgs>
  _count?: boolean | Prisma.WorkflowCountOutputTypeDefaultArgs<ExtArgs>
}, ExtArgs["result"]["workflow"]>

export type WorkflowSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  userId?: boolean
  name?: boolean
  description?: boolean
  nodes?: boolean
  edges?: boolean
  webhookUrl?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
}, ExtArgs["result"]["workflow"]>

export type WorkflowSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  userId?: boolean
  name?: boolean
  description?: boolean
  nodes?: boolean
  edges?: boolean
  webhookUrl?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
}, ExtArgs["result"]["workflow"]>

export type WorkflowSelectScalar = {
  id?: boolean
  userId?: boolean
  name?: boolean
  description?: boolean
  nodes?: boolean
  edges?: boolean
  webhookUrl?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type WorkflowOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "name" | "description" | "nodes" | "edges" | "webhookUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["workflow"]>
export type WorkflowInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
  executions?: boolean | Prisma.Workflow$executionsArgs<ExtArgs>
  _count?: boolean | Prisma.WorkflowCountOutputTypeDefaultArgs<ExtArgs>
}
export type WorkflowIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
}
export type WorkflowIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
}

export type $WorkflowPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "Workflow"
  objects: {
    user: Prisma.$UserPayload<ExtArgs>
    executions: Prisma.$ExecutionPayload<ExtArgs>[]
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    userId: string
    name: string
    description: string | null
    nodes: runtime.JsonValue
    edges: runtime.JsonValue
    webhookUrl: string | null
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["workflow"]>
  composites: {}
}

export type WorkflowGetPayload<S extends boolean | null | undefined | WorkflowDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkflowPayload, S>

export type WorkflowCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<WorkflowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkflowCountAggregateInputType | true
  }

export interface WorkflowDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workflow'], meta: { name: 'Workflow' } }
  
  findUnique<T extends WorkflowFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkflowFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  
  findUniqueOrThrow<T extends WorkflowFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkflowFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  findFirst<T extends WorkflowFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkflowFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  
  findFirstOrThrow<T extends WorkflowFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkflowFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  findMany<T extends WorkflowFindManyArgs>(args?: Prisma.SelectSubset<T, WorkflowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

  
  create<T extends WorkflowCreateArgs>(args: Prisma.SelectSubset<T, WorkflowCreateArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  createMany<T extends WorkflowCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkflowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  
  createManyAndReturn<T extends WorkflowCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkflowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

  
  delete<T extends WorkflowDeleteArgs>(args: Prisma.SelectSubset<T, WorkflowDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  update<T extends WorkflowUpdateArgs>(args: Prisma.SelectSubset<T, WorkflowUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  deleteMany<T extends WorkflowDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkflowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  
  updateMany<T extends WorkflowUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkflowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  
  updateManyAndReturn<T extends WorkflowUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkflowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

  
  upsert<T extends WorkflowUpsertArgs>(args: Prisma.SelectSubset<T, WorkflowUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


  
  count<T extends WorkflowCountArgs>(
    args?: Prisma.Subset<T, WorkflowCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], WorkflowCountAggregateOutputType>
      : number
  >

  
  aggregate<T extends WorkflowAggregateArgs>(args: Prisma.Subset<T, WorkflowAggregateArgs>): Prisma.PrismaPromise<GetWorkflowAggregateType<T>>

  
  groupBy<
    T extends WorkflowGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: WorkflowGroupByArgs['orderBy'] }
      : { orderBy?: WorkflowGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
          ? never
          : P extends string
          ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
          : [
              Error,
              'Field ',
              P,
              ` in "having" needs to be provided in "by"`,
            ]
      }[HavingFields]
    : 'take' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
          ? never
          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
      }[OrderFields]
  >(args: Prisma.SubsetIntersection<T, WorkflowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

readonly fields: WorkflowFieldRefs;
}


export interface Prisma__WorkflowClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  executions<T extends Prisma.Workflow$executionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Workflow$executionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
  
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
  
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
  
  finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}





export interface WorkflowFieldRefs {
  readonly id: Prisma.FieldRef<"Workflow", 'String'>
  readonly userId: Prisma.FieldRef<"Workflow", 'String'>
  readonly name: Prisma.FieldRef<"Workflow", 'String'>
  readonly description: Prisma.FieldRef<"Workflow", 'String'>
  readonly nodes: Prisma.FieldRef<"Workflow", 'Json'>
  readonly edges: Prisma.FieldRef<"Workflow", 'Json'>
  readonly webhookUrl: Prisma.FieldRef<"Workflow", 'String'>
  readonly createdAt: Prisma.FieldRef<"Workflow", 'DateTime'>
  readonly updatedAt: Prisma.FieldRef<"Workflow", 'DateTime'>
}
    



export type WorkflowFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.WorkflowSelect<ExtArgs> | null
  
  omit?: Prisma.WorkflowOmit<ExtArgs> | null
  
  include?: Prisma.WorkflowInclude<ExtArgs> | null
  
  where: Prisma.WorkflowWhereUniqueInput
}


export type WorkflowFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.WorkflowSelect<ExtArgs> | null
  
  omit?: Prisma.WorkflowOmit<ExtArgs> | null
  
  include?: Prisma.WorkflowInclude<ExtArgs> | null
  
  where: Prisma.WorkflowWhereUniqueInput
}


export type WorkflowFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.WorkflowSelect<ExtArgs> | null
  
  omit?: Prisma.WorkflowOmit<ExtArgs> | null
  
  include?: Prisma.WorkflowInclude<ExtArgs> | null
  
  where?: Prisma.WorkflowWhereInput
  
  orderBy?: Prisma.WorkflowOrderByWithRelationInput | Prisma.WorkflowOrderByWithRelationInput[]
  
  cursor?: Prisma.WorkflowWhereUniqueInput
  
  take?: number
  
  skip?: number
  
  distinct?: Prisma.WorkflowScalarFieldEnum | Prisma.WorkflowScalarFieldEnum[]
}


export type WorkflowFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.WorkflowSelect<ExtArgs> | null
  
  omit?: Prisma.WorkflowOmit<ExtArgs> | null
  
  include?: Prisma.WorkflowInclude<ExtArgs> | null
  
  where?: Prisma.WorkflowWhereInput
  
  orderBy?: Prisma.WorkflowOrderByWithRelationInput | Prisma.WorkflowOrderByWithRelationInput[]
  
  cursor?: Prisma.WorkflowWhereUniqueInput
  
  take?: number
  
  skip?: number
  
  distinct?: Prisma.WorkflowScalarFieldEnum | Prisma.WorkflowScalarFieldEnum[]
}


export type WorkflowFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.WorkflowSelect<ExtArgs> | null
  
  omit?: Prisma.WorkflowOmit<ExtArgs> | null
  
  include?: Prisma.WorkflowInclude<ExtArgs> | null
  
  where?: Prisma.WorkflowWhereInput
  
  orderBy?: Prisma.WorkflowOrderByWithRelationInput | Prisma.WorkflowOrderByWithRelationInput[]
  
  cursor?: Prisma.WorkflowWhereUniqueInput
  
  take?: number
  
  skip?: number
  distinct?: Prisma.WorkflowScalarFieldEnum | Prisma.WorkflowScalarFieldEnum[]
}


export type WorkflowCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.WorkflowSelect<ExtArgs> | null
  
  omit?: Prisma.WorkflowOmit<ExtArgs> | null
  
  include?: Prisma.WorkflowInclude<ExtArgs> | null
  
  data: Prisma.XOR<Prisma.WorkflowCreateInput, Prisma.WorkflowUncheckedCreateInput>
}


export type WorkflowCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  data: Prisma.WorkflowCreateManyInput | Prisma.WorkflowCreateManyInput[]
  skipDuplicates?: boolean
}


export type WorkflowCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.WorkflowSelectCreateManyAndReturn<ExtArgs> | null
  
  omit?: Prisma.WorkflowOmit<ExtArgs> | null
  
  data: Prisma.WorkflowCreateManyInput | Prisma.WorkflowCreateManyInput[]
  skipDuplicates?: boolean
  
  include?: Prisma.WorkflowIncludeCreateManyAndReturn<ExtArgs> | null
}


export type WorkflowUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.WorkflowSelect<ExtArgs> | null
  
  omit?: Prisma.WorkflowOmit<ExtArgs> | null
  
  include?: Prisma.WorkflowInclude<ExtArgs> | null
  
  data: Prisma.XOR<Prisma.WorkflowUpdateInput, Prisma.WorkflowUncheckedUpdateInput>
  
  where: Prisma.WorkflowWhereUniqueInput
}


export type WorkflowUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  data: Prisma.XOR<Prisma.WorkflowUpdateManyMutationInput, Prisma.WorkflowUncheckedUpdateManyInput>
  
  where?: Prisma.WorkflowWhereInput
  
  limit?: number
}


export type WorkflowUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.WorkflowSelectUpdateManyAndReturn<ExtArgs> | null
  
  omit?: Prisma.WorkflowOmit<ExtArgs> | null
  
  data: Prisma.XOR<Prisma.WorkflowUpdateManyMutationInput, Prisma.WorkflowUncheckedUpdateManyInput>
  
  where?: Prisma.WorkflowWhereInput
  
  limit?: number
  
  include?: Prisma.WorkflowIncludeUpdateManyAndReturn<ExtArgs> | null
}


export type WorkflowUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.WorkflowSelect<ExtArgs> | null
  
  omit?: Prisma.WorkflowOmit<ExtArgs> | null
  
  include?: Prisma.WorkflowInclude<ExtArgs> | null
  
  where: Prisma.WorkflowWhereUniqueInput
  
  create: Prisma.XOR<Prisma.WorkflowCreateInput, Prisma.WorkflowUncheckedCreateInput>
  
  update: Prisma.XOR<Prisma.WorkflowUpdateInput, Prisma.WorkflowUncheckedUpdateInput>
}


export type WorkflowDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.WorkflowSelect<ExtArgs> | null
  
  omit?: Prisma.WorkflowOmit<ExtArgs> | null
  
  include?: Prisma.WorkflowInclude<ExtArgs> | null
  
  where: Prisma.WorkflowWhereUniqueInput
}


export type WorkflowDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  where?: Prisma.WorkflowWhereInput
  
  limit?: number
}


export type Workflow$executionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.ExecutionSelect<ExtArgs> | null
  
  omit?: Prisma.ExecutionOmit<ExtArgs> | null
  
  include?: Prisma.ExecutionInclude<ExtArgs> | null
  where?: Prisma.ExecutionWhereInput
  orderBy?: Prisma.ExecutionOrderByWithRelationInput | Prisma.ExecutionOrderByWithRelationInput[]
  cursor?: Prisma.ExecutionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Prisma.ExecutionScalarFieldEnum | Prisma.ExecutionScalarFieldEnum[]
}


export type WorkflowDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.WorkflowSelect<ExtArgs> | null
  
  omit?: Prisma.WorkflowOmit<ExtArgs> | null
  
  include?: Prisma.WorkflowInclude<ExtArgs> | null
}
