






import * as runtime from "@prisma/client/runtime/client"
import type * as Prisma from "./prismaNamespace.ts"


const config: runtime.GetPrismaClientConfig = {
  "previewFeatures": [],
  "clientVersion": "7.0.1",
  "engineVersion": "f09f2815f091dbba658cdcd2264306d88bb5bda6",
  "activeProvider": "postgresql",
  "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel User {\n  id          String       @id @default(cuid())\n  email       String       @unique\n  username    String       @unique\n  password    String\n  workflows   Workflow[]\n  credentials Credential[]\n}\n\nmodel Workflow {\n  id          String      @id @default(cuid())\n  user        User        @relation(fields: [userId], references: [id])\n  userId      String\n  name        String      @default(\"untitled workflow\")\n  description String?\n  nodes       Json        @default(\"[]\")\n  edges       Json        @default(\"[]\")\n  executions  Execution[]\n  webhookUrl  String?     @unique\n  createdAt   DateTime    @default(now())\n  updatedAt   DateTime    @updatedAt\n\n  @@index([userId])\n}\n\nenum ExecutionStatus {\n  SUCCESS\n  FAILURE\n}\n\nmodel Execution {\n  id         String          @id @default(cuid())\n  workflowId String\n  workflow   Workflow        @relation(fields: [workflowId], references: [id])\n  status     ExecutionStatus\n  startTime  DateTime        @default(now())\n  endTime    DateTime?\n\n  @@index([workflowId])\n  @@index([status])\n}\n\nmodel Credential {\n  id            String   @id @default(uuid())\n  userId        String\n  user          User     @relation(fields: [userId], references: [id])\n  name          String\n  type          String\n  encryptedData String\n  iv            String\n  authTag       String?\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n}\n",
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"username\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"workflows\",\"kind\":\"object\",\"type\":\"Workflow\",\"relationName\":\"UserToWorkflow\"},{\"name\":\"credentials\",\"kind\":\"object\",\"type\":\"Credential\",\"relationName\":\"CredentialToUser\"}],\"dbName\":null},\"Workflow\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToWorkflow\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nodes\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"edges\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"executions\",\"kind\":\"object\",\"type\":\"Execution\",\"relationName\":\"ExecutionToWorkflow\"},{\"name\":\"webhookUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Execution\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"workflowId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"workflow\",\"kind\":\"object\",\"type\":\"Workflow\",\"relationName\":\"ExecutionToWorkflow\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"ExecutionStatus\"},{\"name\":\"startTime\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"endTime\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Credential\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CredentialToUser\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"encryptedData\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"iv\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"authTag\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")

async function decodeBase64AsWasm(wasmBase64: string): Promise<WebAssembly.Module> {
  const { Buffer } = await import('node:buffer')
  const wasmArray = Buffer.from(wasmBase64, 'base64')
  return new WebAssembly.Module(wasmArray)
}

config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_bg.postgresql.mjs"),

  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.mjs")
    return await decodeBase64AsWasm(wasm)
  }
}



export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> =
  'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never

export interface PrismaClientConstructor {
    

  new <
    Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
    LogOpts extends LogOptions<Options> = LogOptions<Options>,
    OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends { omit: infer U } ? U : Prisma.PrismaClientOptions['omit'],
    ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
  >(options: Prisma.Subset<Options, Prisma.PrismaClientOptions> ): PrismaClient<LogOpts, OmitOpts, ExtArgs>
}



export interface PrismaClient<
  in LogOpts extends Prisma.LogLevel = never,
  in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined,
  in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

  $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  
  $connect(): runtime.Types.Utils.JsPromise<void>;

  
  $disconnect(): runtime.Types.Utils.JsPromise<void>;


  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): runtime.Types.Utils.JsPromise<R>

  $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
    extArgs: ExtArgs
  }>>

      
  get user(): Prisma.UserDelegate<ExtArgs, { omit: OmitOpts }>;

  
  get workflow(): Prisma.WorkflowDelegate<ExtArgs, { omit: OmitOpts }>;

  
  get execution(): Prisma.ExecutionDelegate<ExtArgs, { omit: OmitOpts }>;

  
  get credential(): Prisma.CredentialDelegate<ExtArgs, { omit: OmitOpts }>;
}

export function getPrismaClientClass(): PrismaClientConstructor {
  return runtime.getPrismaClient(config) as unknown as PrismaClientConstructor
}
