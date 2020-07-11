export enum Status {
  IN_PROGRESS = 'IN_PROGRESS',
  TODO = 'TODO',
  DONE = 'DONE',
}

export interface Task {
  id: string
  description: string
  status: Status
}
