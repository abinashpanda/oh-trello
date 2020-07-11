import React, { useState, useCallback } from 'react'
import { v1 } from 'uuid'
import List from './List'

enum Status {
  IN_PROGRESS = 'IN_PROGRESS',
  TODO = 'TODO',
  DONE = 'DONE',
}

interface Task {
  id: string
  description: string
  status: Status
}

const lists = [
  {
    name: 'Todo',
    status: Status.TODO,
  },
  {
    name: 'In Progress',
    status: Status.IN_PROGRESS,
  },
  {
    name: 'Done',
    status: Status.DONE,
  },
]

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', description: 'test', status: Status.TODO },
  ])

  const handleCreateTask = useCallback(
    (status: Status) => (description: string) => {
      setTasks((tasksState) => [
        ...tasksState,
        { status, description, id: v1() },
      ])
    },
    [],
  )

  const handleTaskDrop = useCallback(
    (status: Status) => (taskId: string) => {
      setTasks((tasksState) =>
        tasksState.map((task) => {
          if (task.id === taskId) {
            return { ...task, status }
          }
          return task
        }),
      )
    },
    [],
  )

  return (
    <div className="flex w-screen h-screen p-4 space-x-4 bg-white">
      {lists.map((list) => (
        <List
          key={list.status}
          name={list.name}
          tasks={tasks.filter((task) => task.status === list.status)}
          onCreateTask={handleCreateTask(list.status)}
          onTaskDrop={handleTaskDrop(list.status)}
        />
      ))}
    </div>
  )
}

export default App
