






export const ExecutionStatus = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
} as const

export type ExecutionStatus = (typeof ExecutionStatus)[keyof typeof ExecutionStatus]
