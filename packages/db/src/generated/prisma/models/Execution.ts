





import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums.ts"
import type * as Prisma from "../internal/prismaNamespace.ts"


export type ExecutionModel = runtime.Types.Result.DefaultSelection<Prisma.$ExecutionPayload>

export type AggregateExecution = {
  _count: ExecutionCountAggregateOutputType | null
  _min: ExecutionMinAggregateOutputType | null
  _max: ExecutionMaxAggregateOutputType | null
}

export type ExecutionMinAggregateOutputType = {
  id: string | null
  workflowId: string | null
  status: $Enums.ExecutionStatus | null
  startTime: Date | null
  endTime: Date | null
}

export type ExecutionMaxAggregateOutputType = {
  id: string | null
  workflowId: string | null
  status: $Enums.ExecutionStatus | null
  startTime: Date | null
  endTime: Date | null
}

export type ExecutionCountAggregateOutputType = {
  id: number
  workflowId: number
  status: number
  startTime: number
  endTime: number
  _all: number
}


export type ExecutionMinAggregateInputType = {
  id?: true
  workflowId?: true
  status?: true
  startTime?: true
  endTime?: true
}

export type ExecutionMaxAggregateInputType = {
  id?: true
  workflowId?: true
  status?: true
  startTime?: true
  endTime?: true
}

export type ExecutionCountAggregateInputType = {
  id?: true
  workflowId?: true
  status?: true
  startTime?: true
  endTime?: true
  _all?: true
}

export type ExecutionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  where?: Prisma.ExecutionWhereInput
  
  orderBy?: Prisma.ExecutionOrderByWithRelationInput | Prisma.ExecutionOrderByWithRelationInput[]
  
  cursor?: Prisma.ExecutionWhereUniqueInput
  
  take?: number
  
  skip?: number
  
  _count?: true | ExecutionCountAggregateInputType
  
  _min?: ExecutionMinAggregateInputType
  
  _max?: ExecutionMaxAggregateInputType
}

export type GetExecutionAggregateType<T extends ExecutionAggregateArgs> = {
      [P in keyof T & keyof AggregateExecution]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateExecution[P]>
    : Prisma.GetScalarType<T[P], AggregateExecution[P]>
}




export type ExecutionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.ExecutionWhereInput
  orderBy?: Prisma.ExecutionOrderByWithAggregationInput | Prisma.ExecutionOrderByWithAggregationInput[]
  by: Prisma.ExecutionScalarFieldEnum[] | Prisma.ExecutionScalarFieldEnum
  having?: Prisma.ExecutionScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: ExecutionCountAggregateInputType | true
  _min?: ExecutionMinAggregateInputType
  _max?: ExecutionMaxAggregateInputType
}

export type ExecutionGroupByOutputType = {
  id: string
  workflowId: string
  status: $Enums.ExecutionStatus
  startTime: Date
  endTime: Date | null
  _count: ExecutionCountAggregateOutputType | null
  _min: ExecutionMinAggregateOutputType | null
  _max: ExecutionMaxAggregateOutputType | null
}

type GetExecutionGroupByPayload<T extends ExecutionGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<ExecutionGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof ExecutionGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], ExecutionGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], ExecutionGroupByOutputType[P]>
      }
    >
  >



export type ExecutionWhereInput = {
  AND?: Prisma.ExecutionWhereInput | Prisma.ExecutionWhereInput[]
  OR?: Prisma.ExecutionWhereInput[]
  NOT?: Prisma.ExecutionWhereInput | Prisma.ExecutionWhereInput[]
  id?: Prisma.StringFilter<"Execution"> | string
  workflowId?: Prisma.StringFilter<"Execution"> | string
  status?: Prisma.EnumExecutionStatusFilter<"Execution"> | $Enums.ExecutionStatus
  startTime?: Prisma.DateTimeFilter<"Execution"> | Date | string
  endTime?: Prisma.DateTimeNullableFilter<"Execution"> | Date | string | null
  workflow?: Prisma.XOR<Prisma.WorkflowScalarRelationFilter, Prisma.WorkflowWhereInput>
}

export type ExecutionOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  workflowId?: Prisma.SortOrder
  status?: Prisma.SortOrder
  startTime?: Prisma.SortOrder
  endTime?: Prisma.SortOrderInput | Prisma.SortOrder
  workflow?: Prisma.WorkflowOrderByWithRelationInput
}

export type ExecutionWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  AND?: Prisma.ExecutionWhereInput | Prisma.ExecutionWhereInput[]
  OR?: Prisma.ExecutionWhereInput[]
  NOT?: Prisma.ExecutionWhereInput | Prisma.ExecutionWhereInput[]
  workflowId?: Prisma.StringFilter<"Execution"> | string
  status?: Prisma.EnumExecutionStatusFilter<"Execution"> | $Enums.ExecutionStatus
  startTime?: Prisma.DateTimeFilter<"Execution"> | Date | string
  endTime?: Prisma.DateTimeNullableFilter<"Execution"> | Date | string | null
  workflow?: Prisma.XOR<Prisma.WorkflowScalarRelationFilter, Prisma.WorkflowWhereInput>
}, "id">

export type ExecutionOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  workflowId?: Prisma.SortOrder
  status?: Prisma.SortOrder
  startTime?: Prisma.SortOrder
  endTime?: Prisma.SortOrderInput | Prisma.SortOrder
  _count?: Prisma.ExecutionCountOrderByAggregateInput
  _max?: Prisma.ExecutionMaxOrderByAggregateInput
  _min?: Prisma.ExecutionMinOrderByAggregateInput
}

export type ExecutionScalarWhereWithAggregatesInput = {
  AND?: Prisma.ExecutionScalarWhereWithAggregatesInput | Prisma.ExecutionScalarWhereWithAggregatesInput[]
  OR?: Prisma.ExecutionScalarWhereWithAggregatesInput[]
  NOT?: Prisma.ExecutionScalarWhereWithAggregatesInput | Prisma.ExecutionScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"Execution"> | string
  workflowId?: Prisma.StringWithAggregatesFilter<"Execution"> | string
  status?: Prisma.EnumExecutionStatusWithAggregatesFilter<"Execution"> | $Enums.ExecutionStatus
  startTime?: Prisma.DateTimeWithAggregatesFilter<"Execution"> | Date | string
  endTime?: Prisma.DateTimeNullableWithAggregatesFilter<"Execution"> | Date | string | null
}

export type ExecutionCreateInput = {
  id?: string
  status: $Enums.ExecutionStatus
  startTime?: Date | string
  endTime?: Date | string | null
  workflow: Prisma.WorkflowCreateNestedOneWithoutExecutionsInput
}

export type ExecutionUncheckedCreateInput = {
  id?: string
  workflowId: string
  status: $Enums.ExecutionStatus
  startTime?: Date | string
  endTime?: Date | string | null
}

export type ExecutionUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
  startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  workflow?: Prisma.WorkflowUpdateOneRequiredWithoutExecutionsNestedInput
}

export type ExecutionUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  workflowId?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
  startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
}

export type ExecutionCreateManyInput = {
  id?: string
  workflowId: string
  status: $Enums.ExecutionStatus
  startTime?: Date | string
  endTime?: Date | string | null
}

export type ExecutionUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
  startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
}

export type ExecutionUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  workflowId?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
  startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
}

export type ExecutionListRelationFilter = {
  every?: Prisma.ExecutionWhereInput
  some?: Prisma.ExecutionWhereInput
  none?: Prisma.ExecutionWhereInput
}

export type ExecutionOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type ExecutionCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  workflowId?: Prisma.SortOrder
  status?: Prisma.SortOrder
  startTime?: Prisma.SortOrder
  endTime?: Prisma.SortOrder
}

export type ExecutionMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  workflowId?: Prisma.SortOrder
  status?: Prisma.SortOrder
  startTime?: Prisma.SortOrder
  endTime?: Prisma.SortOrder
}

export type ExecutionMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  workflowId?: Prisma.SortOrder
  status?: Prisma.SortOrder
  startTime?: Prisma.SortOrder
  endTime?: Prisma.SortOrder
}

export type ExecutionCreateNestedManyWithoutWorkflowInput = {
  create?: Prisma.XOR<Prisma.ExecutionCreateWithoutWorkflowInput, Prisma.ExecutionUncheckedCreateWithoutWorkflowInput> | Prisma.ExecutionCreateWithoutWorkflowInput[] | Prisma.ExecutionUncheckedCreateWithoutWorkflowInput[]
  connectOrCreate?: Prisma.ExecutionCreateOrConnectWithoutWorkflowInput | Prisma.ExecutionCreateOrConnectWithoutWorkflowInput[]
  createMany?: Prisma.ExecutionCreateManyWorkflowInputEnvelope
  connect?: Prisma.ExecutionWhereUniqueInput | Prisma.ExecutionWhereUniqueInput[]
}

export type ExecutionUncheckedCreateNestedManyWithoutWorkflowInput = {
  create?: Prisma.XOR<Prisma.ExecutionCreateWithoutWorkflowInput, Prisma.ExecutionUncheckedCreateWithoutWorkflowInput> | Prisma.ExecutionCreateWithoutWorkflowInput[] | Prisma.ExecutionUncheckedCreateWithoutWorkflowInput[]
  connectOrCreate?: Prisma.ExecutionCreateOrConnectWithoutWorkflowInput | Prisma.ExecutionCreateOrConnectWithoutWorkflowInput[]
  createMany?: Prisma.ExecutionCreateManyWorkflowInputEnvelope
  connect?: Prisma.ExecutionWhereUniqueInput | Prisma.ExecutionWhereUniqueInput[]
}

export type ExecutionUpdateManyWithoutWorkflowNestedInput = {
  create?: Prisma.XOR<Prisma.ExecutionCreateWithoutWorkflowInput, Prisma.ExecutionUncheckedCreateWithoutWorkflowInput> | Prisma.ExecutionCreateWithoutWorkflowInput[] | Prisma.ExecutionUncheckedCreateWithoutWorkflowInput[]
  connectOrCreate?: Prisma.ExecutionCreateOrConnectWithoutWorkflowInput | Prisma.ExecutionCreateOrConnectWithoutWorkflowInput[]
  upsert?: Prisma.ExecutionUpsertWithWhereUniqueWithoutWorkflowInput | Prisma.ExecutionUpsertWithWhereUniqueWithoutWorkflowInput[]
  createMany?: Prisma.ExecutionCreateManyWorkflowInputEnvelope
  set?: Prisma.ExecutionWhereUniqueInput | Prisma.ExecutionWhereUniqueInput[]
  disconnect?: Prisma.ExecutionWhereUniqueInput | Prisma.ExecutionWhereUniqueInput[]
  delete?: Prisma.ExecutionWhereUniqueInput | Prisma.ExecutionWhereUniqueInput[]
  connect?: Prisma.ExecutionWhereUniqueInput | Prisma.ExecutionWhereUniqueInput[]
  update?: Prisma.ExecutionUpdateWithWhereUniqueWithoutWorkflowInput | Prisma.ExecutionUpdateWithWhereUniqueWithoutWorkflowInput[]
  updateMany?: Prisma.ExecutionUpdateManyWithWhereWithoutWorkflowInput | Prisma.ExecutionUpdateManyWithWhereWithoutWorkflowInput[]
  deleteMany?: Prisma.ExecutionScalarWhereInput | Prisma.ExecutionScalarWhereInput[]
}

export type ExecutionUncheckedUpdateManyWithoutWorkflowNestedInput = {
  create?: Prisma.XOR<Prisma.ExecutionCreateWithoutWorkflowInput, Prisma.ExecutionUncheckedCreateWithoutWorkflowInput> | Prisma.ExecutionCreateWithoutWorkflowInput[] | Prisma.ExecutionUncheckedCreateWithoutWorkflowInput[]
  connectOrCreate?: Prisma.ExecutionCreateOrConnectWithoutWorkflowInput | Prisma.ExecutionCreateOrConnectWithoutWorkflowInput[]
  upsert?: Prisma.ExecutionUpsertWithWhereUniqueWithoutWorkflowInput | Prisma.ExecutionUpsertWithWhereUniqueWithoutWorkflowInput[]
  createMany?: Prisma.ExecutionCreateManyWorkflowInputEnvelope
  set?: Prisma.ExecutionWhereUniqueInput | Prisma.ExecutionWhereUniqueInput[]
  disconnect?: Prisma.ExecutionWhereUniqueInput | Prisma.ExecutionWhereUniqueInput[]
  delete?: Prisma.ExecutionWhereUniqueInput | Prisma.ExecutionWhereUniqueInput[]
  connect?: Prisma.ExecutionWhereUniqueInput | Prisma.ExecutionWhereUniqueInput[]
  update?: Prisma.ExecutionUpdateWithWhereUniqueWithoutWorkflowInput | Prisma.ExecutionUpdateWithWhereUniqueWithoutWorkflowInput[]
  updateMany?: Prisma.ExecutionUpdateManyWithWhereWithoutWorkflowInput | Prisma.ExecutionUpdateManyWithWhereWithoutWorkflowInput[]
  deleteMany?: Prisma.ExecutionScalarWhereInput | Prisma.ExecutionScalarWhereInput[]
}

export type EnumExecutionStatusFieldUpdateOperationsInput = {
  set?: $Enums.ExecutionStatus
}

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Date | string | null
}

export type ExecutionCreateWithoutWorkflowInput = {
  id?: string
  status: $Enums.ExecutionStatus
  startTime?: Date | string
  endTime?: Date | string | null
}

export type ExecutionUncheckedCreateWithoutWorkflowInput = {
  id?: string
  status: $Enums.ExecutionStatus
  startTime?: Date | string
  endTime?: Date | string | null
}

export type ExecutionCreateOrConnectWithoutWorkflowInput = {
  where: Prisma.ExecutionWhereUniqueInput
  create: Prisma.XOR<Prisma.ExecutionCreateWithoutWorkflowInput, Prisma.ExecutionUncheckedCreateWithoutWorkflowInput>
}

export type ExecutionCreateManyWorkflowInputEnvelope = {
  data: Prisma.ExecutionCreateManyWorkflowInput | Prisma.ExecutionCreateManyWorkflowInput[]
  skipDuplicates?: boolean
}

export type ExecutionUpsertWithWhereUniqueWithoutWorkflowInput = {
  where: Prisma.ExecutionWhereUniqueInput
  update: Prisma.XOR<Prisma.ExecutionUpdateWithoutWorkflowInput, Prisma.ExecutionUncheckedUpdateWithoutWorkflowInput>
  create: Prisma.XOR<Prisma.ExecutionCreateWithoutWorkflowInput, Prisma.ExecutionUncheckedCreateWithoutWorkflowInput>
}

export type ExecutionUpdateWithWhereUniqueWithoutWorkflowInput = {
  where: Prisma.ExecutionWhereUniqueInput
  data: Prisma.XOR<Prisma.ExecutionUpdateWithoutWorkflowInput, Prisma.ExecutionUncheckedUpdateWithoutWorkflowInput>
}

export type ExecutionUpdateManyWithWhereWithoutWorkflowInput = {
  where: Prisma.ExecutionScalarWhereInput
  data: Prisma.XOR<Prisma.ExecutionUpdateManyMutationInput, Prisma.ExecutionUncheckedUpdateManyWithoutWorkflowInput>
}

export type ExecutionScalarWhereInput = {
  AND?: Prisma.ExecutionScalarWhereInput | Prisma.ExecutionScalarWhereInput[]
  OR?: Prisma.ExecutionScalarWhereInput[]
  NOT?: Prisma.ExecutionScalarWhereInput | Prisma.ExecutionScalarWhereInput[]
  id?: Prisma.StringFilter<"Execution"> | string
  workflowId?: Prisma.StringFilter<"Execution"> | string
  status?: Prisma.EnumExecutionStatusFilter<"Execution"> | $Enums.ExecutionStatus
  startTime?: Prisma.DateTimeFilter<"Execution"> | Date | string
  endTime?: Prisma.DateTimeNullableFilter<"Execution"> | Date | string | null
}

export type ExecutionCreateManyWorkflowInput = {
  id?: string
  status: $Enums.ExecutionStatus
  startTime?: Date | string
  endTime?: Date | string | null
}

export type ExecutionUpdateWithoutWorkflowInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
  startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
}

export type ExecutionUncheckedUpdateWithoutWorkflowInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
  startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
}

export type ExecutionUncheckedUpdateManyWithoutWorkflowInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  status?: Prisma.EnumExecutionStatusFieldUpdateOperationsInput | $Enums.ExecutionStatus
  startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  endTime?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
}



export type ExecutionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  workflowId?: boolean
  status?: boolean
  startTime?: boolean
  endTime?: boolean
  workflow?: boolean | Prisma.WorkflowDefaultArgs<ExtArgs>
}, ExtArgs["result"]["execution"]>

export type ExecutionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  workflowId?: boolean
  status?: boolean
  startTime?: boolean
  endTime?: boolean
  workflow?: boolean | Prisma.WorkflowDefaultArgs<ExtArgs>
}, ExtArgs["result"]["execution"]>

export type ExecutionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  workflowId?: boolean
  status?: boolean
  startTime?: boolean
  endTime?: boolean
  workflow?: boolean | Prisma.WorkflowDefaultArgs<ExtArgs>
}, ExtArgs["result"]["execution"]>

export type ExecutionSelectScalar = {
  id?: boolean
  workflowId?: boolean
  status?: boolean
  startTime?: boolean
  endTime?: boolean
}

export type ExecutionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "workflowId" | "status" | "startTime" | "endTime", ExtArgs["result"]["execution"]>
export type ExecutionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  workflow?: boolean | Prisma.WorkflowDefaultArgs<ExtArgs>
}
export type ExecutionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  workflow?: boolean | Prisma.WorkflowDefaultArgs<ExtArgs>
}
export type ExecutionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  workflow?: boolean | Prisma.WorkflowDefaultArgs<ExtArgs>
}

export type $ExecutionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "Execution"
  objects: {
    workflow: Prisma.$WorkflowPayload<ExtArgs>
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    workflowId: string
    status: $Enums.ExecutionStatus
    startTime: Date
    endTime: Date | null
  }, ExtArgs["result"]["execution"]>
  composites: {}
}

export type ExecutionGetPayload<S extends boolean | null | undefined | ExecutionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExecutionPayload, S>

export type ExecutionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<ExecutionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExecutionCountAggregateInputType | true
  }

export interface ExecutionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Execution'], meta: { name: 'Execution' } }
  
  findUnique<T extends ExecutionFindUniqueArgs>(args: Prisma.SelectSubset<T, ExecutionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExecutionClient<runtime.Types.Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  
  findUniqueOrThrow<T extends ExecutionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExecutionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExecutionClient<runtime.Types.Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  findFirst<T extends ExecutionFindFirstArgs>(args?: Prisma.SelectSubset<T, ExecutionFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExecutionClient<runtime.Types.Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  
  findFirstOrThrow<T extends ExecutionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExecutionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExecutionClient<runtime.Types.Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  findMany<T extends ExecutionFindManyArgs>(args?: Prisma.SelectSubset<T, ExecutionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

  
  create<T extends ExecutionCreateArgs>(args: Prisma.SelectSubset<T, ExecutionCreateArgs<ExtArgs>>): Prisma.Prisma__ExecutionClient<runtime.Types.Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  createMany<T extends ExecutionCreateManyArgs>(args?: Prisma.SelectSubset<T, ExecutionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  
  createManyAndReturn<T extends ExecutionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ExecutionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

  
  delete<T extends ExecutionDeleteArgs>(args: Prisma.SelectSubset<T, ExecutionDeleteArgs<ExtArgs>>): Prisma.Prisma__ExecutionClient<runtime.Types.Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  update<T extends ExecutionUpdateArgs>(args: Prisma.SelectSubset<T, ExecutionUpdateArgs<ExtArgs>>): Prisma.Prisma__ExecutionClient<runtime.Types.Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  deleteMany<T extends ExecutionDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExecutionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  
  updateMany<T extends ExecutionUpdateManyArgs>(args: Prisma.SelectSubset<T, ExecutionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  
  updateManyAndReturn<T extends ExecutionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ExecutionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

  
  upsert<T extends ExecutionUpsertArgs>(args: Prisma.SelectSubset<T, ExecutionUpsertArgs<ExtArgs>>): Prisma.Prisma__ExecutionClient<runtime.Types.Result.GetResult<Prisma.$ExecutionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


  
  count<T extends ExecutionCountArgs>(
    args?: Prisma.Subset<T, ExecutionCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], ExecutionCountAggregateOutputType>
      : number
  >

  
  aggregate<T extends ExecutionAggregateArgs>(args: Prisma.Subset<T, ExecutionAggregateArgs>): Prisma.PrismaPromise<GetExecutionAggregateType<T>>

  
  groupBy<
    T extends ExecutionGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: ExecutionGroupByArgs['orderBy'] }
      : { orderBy?: ExecutionGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, ExecutionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExecutionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

readonly fields: ExecutionFieldRefs;
}


export interface Prisma__ExecutionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  workflow<T extends Prisma.WorkflowDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
  
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
  
  finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}





export interface ExecutionFieldRefs {
  readonly id: Prisma.FieldRef<"Execution", 'String'>
  readonly workflowId: Prisma.FieldRef<"Execution", 'String'>
  readonly status: Prisma.FieldRef<"Execution", 'ExecutionStatus'>
  readonly startTime: Prisma.FieldRef<"Execution", 'DateTime'>
  readonly endTime: Prisma.FieldRef<"Execution", 'DateTime'>
}
    



export type ExecutionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.ExecutionSelect<ExtArgs> | null
  
  omit?: Prisma.ExecutionOmit<ExtArgs> | null
  
  include?: Prisma.ExecutionInclude<ExtArgs> | null
  
  where: Prisma.ExecutionWhereUniqueInput
}


export type ExecutionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.ExecutionSelect<ExtArgs> | null
  
  omit?: Prisma.ExecutionOmit<ExtArgs> | null
  
  include?: Prisma.ExecutionInclude<ExtArgs> | null
  
  where: Prisma.ExecutionWhereUniqueInput
}


export type ExecutionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
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


export type ExecutionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
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


export type ExecutionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
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


export type ExecutionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.ExecutionSelect<ExtArgs> | null
  
  omit?: Prisma.ExecutionOmit<ExtArgs> | null
  
  include?: Prisma.ExecutionInclude<ExtArgs> | null
  
  data: Prisma.XOR<Prisma.ExecutionCreateInput, Prisma.ExecutionUncheckedCreateInput>
}


export type ExecutionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  data: Prisma.ExecutionCreateManyInput | Prisma.ExecutionCreateManyInput[]
  skipDuplicates?: boolean
}


export type ExecutionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.ExecutionSelectCreateManyAndReturn<ExtArgs> | null
  
  omit?: Prisma.ExecutionOmit<ExtArgs> | null
  
  data: Prisma.ExecutionCreateManyInput | Prisma.ExecutionCreateManyInput[]
  skipDuplicates?: boolean
  
  include?: Prisma.ExecutionIncludeCreateManyAndReturn<ExtArgs> | null
}


export type ExecutionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.ExecutionSelect<ExtArgs> | null
  
  omit?: Prisma.ExecutionOmit<ExtArgs> | null
  
  include?: Prisma.ExecutionInclude<ExtArgs> | null
  
  data: Prisma.XOR<Prisma.ExecutionUpdateInput, Prisma.ExecutionUncheckedUpdateInput>
  
  where: Prisma.ExecutionWhereUniqueInput
}


export type ExecutionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  data: Prisma.XOR<Prisma.ExecutionUpdateManyMutationInput, Prisma.ExecutionUncheckedUpdateManyInput>
  
  where?: Prisma.ExecutionWhereInput
  
  limit?: number
}


export type ExecutionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.ExecutionSelectUpdateManyAndReturn<ExtArgs> | null
  
  omit?: Prisma.ExecutionOmit<ExtArgs> | null
  
  data: Prisma.XOR<Prisma.ExecutionUpdateManyMutationInput, Prisma.ExecutionUncheckedUpdateManyInput>
  
  where?: Prisma.ExecutionWhereInput
  
  limit?: number
  
  include?: Prisma.ExecutionIncludeUpdateManyAndReturn<ExtArgs> | null
}


export type ExecutionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.ExecutionSelect<ExtArgs> | null
  
  omit?: Prisma.ExecutionOmit<ExtArgs> | null
  
  include?: Prisma.ExecutionInclude<ExtArgs> | null
  
  where: Prisma.ExecutionWhereUniqueInput
  
  create: Prisma.XOR<Prisma.ExecutionCreateInput, Prisma.ExecutionUncheckedCreateInput>
  
  update: Prisma.XOR<Prisma.ExecutionUpdateInput, Prisma.ExecutionUncheckedUpdateInput>
}


export type ExecutionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.ExecutionSelect<ExtArgs> | null
  
  omit?: Prisma.ExecutionOmit<ExtArgs> | null
  
  include?: Prisma.ExecutionInclude<ExtArgs> | null
  
  where: Prisma.ExecutionWhereUniqueInput
}


export type ExecutionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  where?: Prisma.ExecutionWhereInput
  
  limit?: number
}


export type ExecutionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.ExecutionSelect<ExtArgs> | null
  
  omit?: Prisma.ExecutionOmit<ExtArgs> | null
  
  include?: Prisma.ExecutionInclude<ExtArgs> | null
}
