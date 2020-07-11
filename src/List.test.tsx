import React from 'react'
import List from './List'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

enum Status {
  IN_PROGRESS = 'IN_PROGRESS',
  TODO = 'TODO',
  DONE = 'DONE',
}

describe('<List />', () => {
  it('it renders name correctly', () => {
    const name = 'Todo'
    render(<List name={name} tasks={[]} />)
    expect(screen.getByText(name)).toBeInTheDocument()
  })

  it('it renders tasks correctly', () => {
    const name = 'Todo'
    const tasks = [
      { description: 'First Task', status: Status.IN_PROGRESS, id: '1' },
    ]
    render(<List name={name} tasks={tasks} />)
    expect(screen.getByText(tasks[0].description)).toBeInTheDocument()
  })

  it('it calls onCreateTask on input', () => {
    const name = 'Todo'
    const onCreateTask = jest.fn()
    render(<List name={name} tasks={[]} onCreateTask={onCreateTask} />)
    userEvent.type(screen.getByPlaceholderText(/add task/i), 'dummy{enter}')
    expect(jest.fn()).toBeCalledWith('dummy')
  })
})
