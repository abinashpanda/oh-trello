import React, { useCallback } from 'react'
import clsx from 'clsx'

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

interface Props {
  name: string
  tasks: Task[]
  onCreateTask?: (taskDescription: string) => void
  onTaskDrop?: (taskId: string) => void
  className?: string
  style?: React.CSSProperties
}

const List: React.FC<Props> = ({
  name,
  tasks,
  onCreateTask,
  onTaskDrop,
  className,
  style,
}) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && onCreateTask) {
        console.log(event.key)
        onCreateTask((event.target as HTMLInputElement).value)
        ;(event.target as HTMLInputElement).value = ''
      }
    },
    [onCreateTask],
  )

  return (
    <div
      className={clsx(
        'w-64 rounded-md overflow-hidden shadow flex flex-col bg-gray-100',
        className,
      )}
      style={style}
      onDrop={(event) => {
        event.preventDefault()
        event.stopPropagation()
        if (onTaskDrop) {
          onTaskDrop(event.dataTransfer.getData('id'))
        }
      }}
      onDragOver={(event) => {
        event.preventDefault()
      }}
    >
      <div className="px-4 py-2 text-base font-medium text-white bg-gray-700">
        {name}
      </div>

      {/* Cards container */}
      <div className="flex-1 p-4 space-y-4 overflow-auto shadow-inner">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start p-2 space-x-2 bg-white rounded shadow"
            draggable={true}
            onDragStart={(event) => {
              event.dataTransfer.setData('id', task.id)
            }}
          >
            <div className="flex-1 text-sm text-gray-700">
              {task.description}
            </div>
            <div className="inline-block px-3 py-1 text-xs tracking-wide text-blue-700 uppercase bg-blue-100 rounded-full">
              {task.status}
            </div>
          </div>
        ))}
      </div>
      <input
        placeholder="Add Task"
        className="p-2 mx-4 mb-4 text-sm text-gray-800 border rounded"
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default List
