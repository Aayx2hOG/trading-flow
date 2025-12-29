





import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums.ts"
import type * as Prisma from "../internal/prismaNamespace.ts"


export type CredentialModel = runtime.Types.Result.DefaultSelection<Prisma.$CredentialPayload>

export type AggregateCredential = {
  _count: CredentialCountAggregateOutputType | null
  _min: CredentialMinAggregateOutputType | null
  _max: CredentialMaxAggregateOutputType | null
}

export type CredentialMinAggregateOutputType = {
  id: string | null
  userId: string | null
  name: string | null
  type: string | null
  encryptedData: string | null
  iv: string | null
  authTag: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type CredentialMaxAggregateOutputType = {
  id: string | null
  userId: string | null
  name: string | null
  type: string | null
  encryptedData: string | null
  iv: string | null
  authTag: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type CredentialCountAggregateOutputType = {
  id: number
  userId: number
  name: number
  type: number
  encryptedData: number
  iv: number
  authTag: number
  createdAt: number
  updatedAt: number
  _all: number
}


export type CredentialMinAggregateInputType = {
  id?: true
  userId?: true
  name?: true
  type?: true
  encryptedData?: true
  iv?: true
  authTag?: true
  createdAt?: true
  updatedAt?: true
}

export type CredentialMaxAggregateInputType = {
  id?: true
  userId?: true
  name?: true
  type?: true
  encryptedData?: true
  iv?: true
  authTag?: true
  createdAt?: true
  updatedAt?: true
}

export type CredentialCountAggregateInputType = {
  id?: true
  userId?: true
  name?: true
  type?: true
  encryptedData?: true
  iv?: true
  authTag?: true
  createdAt?: true
  updatedAt?: true
  _all?: true
}

export type CredentialAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  where?: Prisma.CredentialWhereInput
  
  orderBy?: Prisma.CredentialOrderByWithRelationInput | Prisma.CredentialOrderByWithRelationInput[]
  
  cursor?: Prisma.CredentialWhereUniqueInput
  
  take?: number
  
  skip?: number
  
  _count?: true | CredentialCountAggregateInputType
  
  _min?: CredentialMinAggregateInputType
  
  _max?: CredentialMaxAggregateInputType
}

export type GetCredentialAggregateType<T extends CredentialAggregateArgs> = {
      [P in keyof T & keyof AggregateCredential]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateCredential[P]>
    : Prisma.GetScalarType<T[P], AggregateCredential[P]>
}




export type CredentialGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.CredentialWhereInput
  orderBy?: Prisma.CredentialOrderByWithAggregationInput | Prisma.CredentialOrderByWithAggregationInput[]
  by: Prisma.CredentialScalarFieldEnum[] | Prisma.CredentialScalarFieldEnum
  having?: Prisma.CredentialScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: CredentialCountAggregateInputType | true
  _min?: CredentialMinAggregateInputType
  _max?: CredentialMaxAggregateInputType
}

export type CredentialGroupByOutputType = {
  id: string
  userId: string
  name: string
  type: string
  encryptedData: string
  iv: string
  authTag: string | null
  createdAt: Date
  updatedAt: Date
  _count: CredentialCountAggregateOutputType | null
  _min: CredentialMinAggregateOutputType | null
  _max: CredentialMaxAggregateOutputType | null
}

type GetCredentialGroupByPayload<T extends CredentialGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<CredentialGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof CredentialGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], CredentialGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], CredentialGroupByOutputType[P]>
      }
    >
  >



export type CredentialWhereInput = {
  AND?: Prisma.CredentialWhereInput | Prisma.CredentialWhereInput[]
  OR?: Prisma.CredentialWhereInput[]
  NOT?: Prisma.CredentialWhereInput | Prisma.CredentialWhereInput[]
  id?: Prisma.StringFilter<"Credential"> | string
  userId?: Prisma.StringFilter<"Credential"> | string
  name?: Prisma.StringFilter<"Credential"> | string
  type?: Prisma.StringFilter<"Credential"> | string
  encryptedData?: Prisma.StringFilter<"Credential"> | string
  iv?: Prisma.StringFilter<"Credential"> | string
  authTag?: Prisma.StringNullableFilter<"Credential"> | string | null
  createdAt?: Prisma.DateTimeFilter<"Credential"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Credential"> | Date | string
  user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>
}

export type CredentialOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  type?: Prisma.SortOrder
  encryptedData?: Prisma.SortOrder
  iv?: Prisma.SortOrder
  authTag?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  user?: Prisma.UserOrderByWithRelationInput
}

export type CredentialWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  AND?: Prisma.CredentialWhereInput | Prisma.CredentialWhereInput[]
  OR?: Prisma.CredentialWhereInput[]
  NOT?: Prisma.CredentialWhereInput | Prisma.CredentialWhereInput[]
  userId?: Prisma.StringFilter<"Credential"> | string
  name?: Prisma.StringFilter<"Credential"> | string
  type?: Prisma.StringFilter<"Credential"> | string
  encryptedData?: Prisma.StringFilter<"Credential"> | string
  iv?: Prisma.StringFilter<"Credential"> | string
  authTag?: Prisma.StringNullableFilter<"Credential"> | string | null
  createdAt?: Prisma.DateTimeFilter<"Credential"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Credential"> | Date | string
  user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>
}, "id">

export type CredentialOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  type?: Prisma.SortOrder
  encryptedData?: Prisma.SortOrder
  iv?: Prisma.SortOrder
  authTag?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  _count?: Prisma.CredentialCountOrderByAggregateInput
  _max?: Prisma.CredentialMaxOrderByAggregateInput
  _min?: Prisma.CredentialMinOrderByAggregateInput
}

export type CredentialScalarWhereWithAggregatesInput = {
  AND?: Prisma.CredentialScalarWhereWithAggregatesInput | Prisma.CredentialScalarWhereWithAggregatesInput[]
  OR?: Prisma.CredentialScalarWhereWithAggregatesInput[]
  NOT?: Prisma.CredentialScalarWhereWithAggregatesInput | Prisma.CredentialScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"Credential"> | string
  userId?: Prisma.StringWithAggregatesFilter<"Credential"> | string
  name?: Prisma.StringWithAggregatesFilter<"Credential"> | string
  type?: Prisma.StringWithAggregatesFilter<"Credential"> | string
  encryptedData?: Prisma.StringWithAggregatesFilter<"Credential"> | string
  iv?: Prisma.StringWithAggregatesFilter<"Credential"> | string
  authTag?: Prisma.StringNullableWithAggregatesFilter<"Credential"> | string | null
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"Credential"> | Date | string
  updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Credential"> | Date | string
}

export type CredentialCreateInput = {
  id?: string
  name: string
  type: string
  encryptedData: string
  iv: string
  authTag?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  user: Prisma.UserCreateNestedOneWithoutCredentialsInput
}

export type CredentialUncheckedCreateInput = {
  id?: string
  userId: string
  name: string
  type: string
  encryptedData: string
  iv: string
  authTag?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type CredentialUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  encryptedData?: Prisma.StringFieldUpdateOperationsInput | string
  iv?: Prisma.StringFieldUpdateOperationsInput | string
  authTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  user?: Prisma.UserUpdateOneRequiredWithoutCredentialsNestedInput
}

export type CredentialUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  encryptedData?: Prisma.StringFieldUpdateOperationsInput | string
  iv?: Prisma.StringFieldUpdateOperationsInput | string
  authTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type CredentialCreateManyInput = {
  id?: string
  userId: string
  name: string
  type: string
  encryptedData: string
  iv: string
  authTag?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type CredentialUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  encryptedData?: Prisma.StringFieldUpdateOperationsInput | string
  iv?: Prisma.StringFieldUpdateOperationsInput | string
  authTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type CredentialUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  encryptedData?: Prisma.StringFieldUpdateOperationsInput | string
  iv?: Prisma.StringFieldUpdateOperationsInput | string
  authTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type CredentialListRelationFilter = {
  every?: Prisma.CredentialWhereInput
  some?: Prisma.CredentialWhereInput
  none?: Prisma.CredentialWhereInput
}

export type CredentialOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type CredentialCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  type?: Prisma.SortOrder
  encryptedData?: Prisma.SortOrder
  iv?: Prisma.SortOrder
  authTag?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type CredentialMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  type?: Prisma.SortOrder
  encryptedData?: Prisma.SortOrder
  iv?: Prisma.SortOrder
  authTag?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type CredentialMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  type?: Prisma.SortOrder
  encryptedData?: Prisma.SortOrder
  iv?: Prisma.SortOrder
  authTag?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type CredentialCreateNestedManyWithoutUserInput = {
  create?: Prisma.XOR<Prisma.CredentialCreateWithoutUserInput, Prisma.CredentialUncheckedCreateWithoutUserInput> | Prisma.CredentialCreateWithoutUserInput[] | Prisma.CredentialUncheckedCreateWithoutUserInput[]
  connectOrCreate?: Prisma.CredentialCreateOrConnectWithoutUserInput | Prisma.CredentialCreateOrConnectWithoutUserInput[]
  createMany?: Prisma.CredentialCreateManyUserInputEnvelope
  connect?: Prisma.CredentialWhereUniqueInput | Prisma.CredentialWhereUniqueInput[]
}

export type CredentialUncheckedCreateNestedManyWithoutUserInput = {
  create?: Prisma.XOR<Prisma.CredentialCreateWithoutUserInput, Prisma.CredentialUncheckedCreateWithoutUserInput> | Prisma.CredentialCreateWithoutUserInput[] | Prisma.CredentialUncheckedCreateWithoutUserInput[]
  connectOrCreate?: Prisma.CredentialCreateOrConnectWithoutUserInput | Prisma.CredentialCreateOrConnectWithoutUserInput[]
  createMany?: Prisma.CredentialCreateManyUserInputEnvelope
  connect?: Prisma.CredentialWhereUniqueInput | Prisma.CredentialWhereUniqueInput[]
}

export type CredentialUpdateManyWithoutUserNestedInput = {
  create?: Prisma.XOR<Prisma.CredentialCreateWithoutUserInput, Prisma.CredentialUncheckedCreateWithoutUserInput> | Prisma.CredentialCreateWithoutUserInput[] | Prisma.CredentialUncheckedCreateWithoutUserInput[]
  connectOrCreate?: Prisma.CredentialCreateOrConnectWithoutUserInput | Prisma.CredentialCreateOrConnectWithoutUserInput[]
  upsert?: Prisma.CredentialUpsertWithWhereUniqueWithoutUserInput | Prisma.CredentialUpsertWithWhereUniqueWithoutUserInput[]
  createMany?: Prisma.CredentialCreateManyUserInputEnvelope
  set?: Prisma.CredentialWhereUniqueInput | Prisma.CredentialWhereUniqueInput[]
  disconnect?: Prisma.CredentialWhereUniqueInput | Prisma.CredentialWhereUniqueInput[]
  delete?: Prisma.CredentialWhereUniqueInput | Prisma.CredentialWhereUniqueInput[]
  connect?: Prisma.CredentialWhereUniqueInput | Prisma.CredentialWhereUniqueInput[]
  update?: Prisma.CredentialUpdateWithWhereUniqueWithoutUserInput | Prisma.CredentialUpdateWithWhereUniqueWithoutUserInput[]
  updateMany?: Prisma.CredentialUpdateManyWithWhereWithoutUserInput | Prisma.CredentialUpdateManyWithWhereWithoutUserInput[]
  deleteMany?: Prisma.CredentialScalarWhereInput | Prisma.CredentialScalarWhereInput[]
}

export type CredentialUncheckedUpdateManyWithoutUserNestedInput = {
  create?: Prisma.XOR<Prisma.CredentialCreateWithoutUserInput, Prisma.CredentialUncheckedCreateWithoutUserInput> | Prisma.CredentialCreateWithoutUserInput[] | Prisma.CredentialUncheckedCreateWithoutUserInput[]
  connectOrCreate?: Prisma.CredentialCreateOrConnectWithoutUserInput | Prisma.CredentialCreateOrConnectWithoutUserInput[]
  upsert?: Prisma.CredentialUpsertWithWhereUniqueWithoutUserInput | Prisma.CredentialUpsertWithWhereUniqueWithoutUserInput[]
  createMany?: Prisma.CredentialCreateManyUserInputEnvelope
  set?: Prisma.CredentialWhereUniqueInput | Prisma.CredentialWhereUniqueInput[]
  disconnect?: Prisma.CredentialWhereUniqueInput | Prisma.CredentialWhereUniqueInput[]
  delete?: Prisma.CredentialWhereUniqueInput | Prisma.CredentialWhereUniqueInput[]
  connect?: Prisma.CredentialWhereUniqueInput | Prisma.CredentialWhereUniqueInput[]
  update?: Prisma.CredentialUpdateWithWhereUniqueWithoutUserInput | Prisma.CredentialUpdateWithWhereUniqueWithoutUserInput[]
  updateMany?: Prisma.CredentialUpdateManyWithWhereWithoutUserInput | Prisma.CredentialUpdateManyWithWhereWithoutUserInput[]
  deleteMany?: Prisma.CredentialScalarWhereInput | Prisma.CredentialScalarWhereInput[]
}

export type CredentialCreateWithoutUserInput = {
  id?: string
  name: string
  type: string
  encryptedData: string
  iv: string
  authTag?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type CredentialUncheckedCreateWithoutUserInput = {
  id?: string
  name: string
  type: string
  encryptedData: string
  iv: string
  authTag?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type CredentialCreateOrConnectWithoutUserInput = {
  where: Prisma.CredentialWhereUniqueInput
  create: Prisma.XOR<Prisma.CredentialCreateWithoutUserInput, Prisma.CredentialUncheckedCreateWithoutUserInput>
}

export type CredentialCreateManyUserInputEnvelope = {
  data: Prisma.CredentialCreateManyUserInput | Prisma.CredentialCreateManyUserInput[]
  skipDuplicates?: boolean
}

export type CredentialUpsertWithWhereUniqueWithoutUserInput = {
  where: Prisma.CredentialWhereUniqueInput
  update: Prisma.XOR<Prisma.CredentialUpdateWithoutUserInput, Prisma.CredentialUncheckedUpdateWithoutUserInput>
  create: Prisma.XOR<Prisma.CredentialCreateWithoutUserInput, Prisma.CredentialUncheckedCreateWithoutUserInput>
}

export type CredentialUpdateWithWhereUniqueWithoutUserInput = {
  where: Prisma.CredentialWhereUniqueInput
  data: Prisma.XOR<Prisma.CredentialUpdateWithoutUserInput, Prisma.CredentialUncheckedUpdateWithoutUserInput>
}

export type CredentialUpdateManyWithWhereWithoutUserInput = {
  where: Prisma.CredentialScalarWhereInput
  data: Prisma.XOR<Prisma.CredentialUpdateManyMutationInput, Prisma.CredentialUncheckedUpdateManyWithoutUserInput>
}

export type CredentialScalarWhereInput = {
  AND?: Prisma.CredentialScalarWhereInput | Prisma.CredentialScalarWhereInput[]
  OR?: Prisma.CredentialScalarWhereInput[]
  NOT?: Prisma.CredentialScalarWhereInput | Prisma.CredentialScalarWhereInput[]
  id?: Prisma.StringFilter<"Credential"> | string
  userId?: Prisma.StringFilter<"Credential"> | string
  name?: Prisma.StringFilter<"Credential"> | string
  type?: Prisma.StringFilter<"Credential"> | string
  encryptedData?: Prisma.StringFilter<"Credential"> | string
  iv?: Prisma.StringFilter<"Credential"> | string
  authTag?: Prisma.StringNullableFilter<"Credential"> | string | null
  createdAt?: Prisma.DateTimeFilter<"Credential"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Credential"> | Date | string
}

export type CredentialCreateManyUserInput = {
  id?: string
  name: string
  type: string
  encryptedData: string
  iv: string
  authTag?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type CredentialUpdateWithoutUserInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  encryptedData?: Prisma.StringFieldUpdateOperationsInput | string
  iv?: Prisma.StringFieldUpdateOperationsInput | string
  authTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type CredentialUncheckedUpdateWithoutUserInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  encryptedData?: Prisma.StringFieldUpdateOperationsInput | string
  iv?: Prisma.StringFieldUpdateOperationsInput | string
  authTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type CredentialUncheckedUpdateManyWithoutUserInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  encryptedData?: Prisma.StringFieldUpdateOperationsInput | string
  iv?: Prisma.StringFieldUpdateOperationsInput | string
  authTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}



export type CredentialSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  userId?: boolean
  name?: boolean
  type?: boolean
  encryptedData?: boolean
  iv?: boolean
  authTag?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
}, ExtArgs["result"]["credential"]>

export type CredentialSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  userId?: boolean
  name?: boolean
  type?: boolean
  encryptedData?: boolean
  iv?: boolean
  authTag?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
}, ExtArgs["result"]["credential"]>

export type CredentialSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  userId?: boolean
  name?: boolean
  type?: boolean
  encryptedData?: boolean
  iv?: boolean
  authTag?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
}, ExtArgs["result"]["credential"]>

export type CredentialSelectScalar = {
  id?: boolean
  userId?: boolean
  name?: boolean
  type?: boolean
  encryptedData?: boolean
  iv?: boolean
  authTag?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type CredentialOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "name" | "type" | "encryptedData" | "iv" | "authTag" | "createdAt" | "updatedAt", ExtArgs["result"]["credential"]>
export type CredentialInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
}
export type CredentialIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
}
export type CredentialIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
}

export type $CredentialPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "Credential"
  objects: {
    user: Prisma.$UserPayload<ExtArgs>
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    userId: string
    name: string
    type: string
    encryptedData: string
    iv: string
    authTag: string | null
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["credential"]>
  composites: {}
}

export type CredentialGetPayload<S extends boolean | null | undefined | CredentialDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CredentialPayload, S>

export type CredentialCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<CredentialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CredentialCountAggregateInputType | true
  }

export interface CredentialDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Credential'], meta: { name: 'Credential' } }
  
  findUnique<T extends CredentialFindUniqueArgs>(args: Prisma.SelectSubset<T, CredentialFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CredentialClient<runtime.Types.Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  
  findUniqueOrThrow<T extends CredentialFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CredentialFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CredentialClient<runtime.Types.Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  findFirst<T extends CredentialFindFirstArgs>(args?: Prisma.SelectSubset<T, CredentialFindFirstArgs<ExtArgs>>): Prisma.Prisma__CredentialClient<runtime.Types.Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  
  findFirstOrThrow<T extends CredentialFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CredentialFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CredentialClient<runtime.Types.Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  findMany<T extends CredentialFindManyArgs>(args?: Prisma.SelectSubset<T, CredentialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

  
  create<T extends CredentialCreateArgs>(args: Prisma.SelectSubset<T, CredentialCreateArgs<ExtArgs>>): Prisma.Prisma__CredentialClient<runtime.Types.Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  createMany<T extends CredentialCreateManyArgs>(args?: Prisma.SelectSubset<T, CredentialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  
  createManyAndReturn<T extends CredentialCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CredentialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

  
  delete<T extends CredentialDeleteArgs>(args: Prisma.SelectSubset<T, CredentialDeleteArgs<ExtArgs>>): Prisma.Prisma__CredentialClient<runtime.Types.Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  update<T extends CredentialUpdateArgs>(args: Prisma.SelectSubset<T, CredentialUpdateArgs<ExtArgs>>): Prisma.Prisma__CredentialClient<runtime.Types.Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  
  deleteMany<T extends CredentialDeleteManyArgs>(args?: Prisma.SelectSubset<T, CredentialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  
  updateMany<T extends CredentialUpdateManyArgs>(args: Prisma.SelectSubset<T, CredentialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  
  updateManyAndReturn<T extends CredentialUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CredentialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

  
  upsert<T extends CredentialUpsertArgs>(args: Prisma.SelectSubset<T, CredentialUpsertArgs<ExtArgs>>): Prisma.Prisma__CredentialClient<runtime.Types.Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


  
  count<T extends CredentialCountArgs>(
    args?: Prisma.Subset<T, CredentialCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], CredentialCountAggregateOutputType>
      : number
  >

  
  aggregate<T extends CredentialAggregateArgs>(args: Prisma.Subset<T, CredentialAggregateArgs>): Prisma.PrismaPromise<GetCredentialAggregateType<T>>

  
  groupBy<
    T extends CredentialGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: CredentialGroupByArgs['orderBy'] }
      : { orderBy?: CredentialGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, CredentialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCredentialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

readonly fields: CredentialFieldRefs;
}


export interface Prisma__CredentialClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
  
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
  
  finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}





export interface CredentialFieldRefs {
  readonly id: Prisma.FieldRef<"Credential", 'String'>
  readonly userId: Prisma.FieldRef<"Credential", 'String'>
  readonly name: Prisma.FieldRef<"Credential", 'String'>
  readonly type: Prisma.FieldRef<"Credential", 'String'>
  readonly encryptedData: Prisma.FieldRef<"Credential", 'String'>
  readonly iv: Prisma.FieldRef<"Credential", 'String'>
  readonly authTag: Prisma.FieldRef<"Credential", 'String'>
  readonly createdAt: Prisma.FieldRef<"Credential", 'DateTime'>
  readonly updatedAt: Prisma.FieldRef<"Credential", 'DateTime'>
}
    



export type CredentialFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.CredentialSelect<ExtArgs> | null
  
  omit?: Prisma.CredentialOmit<ExtArgs> | null
  
  include?: Prisma.CredentialInclude<ExtArgs> | null
  
  where: Prisma.CredentialWhereUniqueInput
}


export type CredentialFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.CredentialSelect<ExtArgs> | null
  
  omit?: Prisma.CredentialOmit<ExtArgs> | null
  
  include?: Prisma.CredentialInclude<ExtArgs> | null
  
  where: Prisma.CredentialWhereUniqueInput
}


export type CredentialFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.CredentialSelect<ExtArgs> | null
  
  omit?: Prisma.CredentialOmit<ExtArgs> | null
  
  include?: Prisma.CredentialInclude<ExtArgs> | null
  
  where?: Prisma.CredentialWhereInput
  
  orderBy?: Prisma.CredentialOrderByWithRelationInput | Prisma.CredentialOrderByWithRelationInput[]
  
  cursor?: Prisma.CredentialWhereUniqueInput
  
  take?: number
  
  skip?: number
  
  distinct?: Prisma.CredentialScalarFieldEnum | Prisma.CredentialScalarFieldEnum[]
}


export type CredentialFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.CredentialSelect<ExtArgs> | null
  
  omit?: Prisma.CredentialOmit<ExtArgs> | null
  
  include?: Prisma.CredentialInclude<ExtArgs> | null
  
  where?: Prisma.CredentialWhereInput
  
  orderBy?: Prisma.CredentialOrderByWithRelationInput | Prisma.CredentialOrderByWithRelationInput[]
  
  cursor?: Prisma.CredentialWhereUniqueInput
  
  take?: number
  
  skip?: number
  
  distinct?: Prisma.CredentialScalarFieldEnum | Prisma.CredentialScalarFieldEnum[]
}


export type CredentialFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.CredentialSelect<ExtArgs> | null
  
  omit?: Prisma.CredentialOmit<ExtArgs> | null
  
  include?: Prisma.CredentialInclude<ExtArgs> | null
  
  where?: Prisma.CredentialWhereInput
  
  orderBy?: Prisma.CredentialOrderByWithRelationInput | Prisma.CredentialOrderByWithRelationInput[]
  
  cursor?: Prisma.CredentialWhereUniqueInput
  
  take?: number
  
  skip?: number
  distinct?: Prisma.CredentialScalarFieldEnum | Prisma.CredentialScalarFieldEnum[]
}


export type CredentialCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.CredentialSelect<ExtArgs> | null
  
  omit?: Prisma.CredentialOmit<ExtArgs> | null
  
  include?: Prisma.CredentialInclude<ExtArgs> | null
  
  data: Prisma.XOR<Prisma.CredentialCreateInput, Prisma.CredentialUncheckedCreateInput>
}


export type CredentialCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  data: Prisma.CredentialCreateManyInput | Prisma.CredentialCreateManyInput[]
  skipDuplicates?: boolean
}


export type CredentialCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.CredentialSelectCreateManyAndReturn<ExtArgs> | null
  
  omit?: Prisma.CredentialOmit<ExtArgs> | null
  
  data: Prisma.CredentialCreateManyInput | Prisma.CredentialCreateManyInput[]
  skipDuplicates?: boolean
  
  include?: Prisma.CredentialIncludeCreateManyAndReturn<ExtArgs> | null
}


export type CredentialUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.CredentialSelect<ExtArgs> | null
  
  omit?: Prisma.CredentialOmit<ExtArgs> | null
  
  include?: Prisma.CredentialInclude<ExtArgs> | null
  
  data: Prisma.XOR<Prisma.CredentialUpdateInput, Prisma.CredentialUncheckedUpdateInput>
  
  where: Prisma.CredentialWhereUniqueInput
}


export type CredentialUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  data: Prisma.XOR<Prisma.CredentialUpdateManyMutationInput, Prisma.CredentialUncheckedUpdateManyInput>
  
  where?: Prisma.CredentialWhereInput
  
  limit?: number
}


export type CredentialUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.CredentialSelectUpdateManyAndReturn<ExtArgs> | null
  
  omit?: Prisma.CredentialOmit<ExtArgs> | null
  
  data: Prisma.XOR<Prisma.CredentialUpdateManyMutationInput, Prisma.CredentialUncheckedUpdateManyInput>
  
  where?: Prisma.CredentialWhereInput
  
  limit?: number
  
  include?: Prisma.CredentialIncludeUpdateManyAndReturn<ExtArgs> | null
}


export type CredentialUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.CredentialSelect<ExtArgs> | null
  
  omit?: Prisma.CredentialOmit<ExtArgs> | null
  
  include?: Prisma.CredentialInclude<ExtArgs> | null
  
  where: Prisma.CredentialWhereUniqueInput
  
  create: Prisma.XOR<Prisma.CredentialCreateInput, Prisma.CredentialUncheckedCreateInput>
  
  update: Prisma.XOR<Prisma.CredentialUpdateInput, Prisma.CredentialUncheckedUpdateInput>
}


export type CredentialDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.CredentialSelect<ExtArgs> | null
  
  omit?: Prisma.CredentialOmit<ExtArgs> | null
  
  include?: Prisma.CredentialInclude<ExtArgs> | null
  
  where: Prisma.CredentialWhereUniqueInput
}


export type CredentialDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  where?: Prisma.CredentialWhereInput
  
  limit?: number
}


export type CredentialDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  
  select?: Prisma.CredentialSelect<ExtArgs> | null
  
  omit?: Prisma.CredentialOmit<ExtArgs> | null
  
  include?: Prisma.CredentialInclude<ExtArgs> | null
}
