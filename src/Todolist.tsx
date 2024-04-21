import {FilterValuesType, TasksType, TaskType} from "./App";
import {ChangeEvent, useEffect, useState} from "react";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    todolistId: string
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, taskTitle: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTasksStatus: (todolistId: string, taskId: string, status: boolean) => void
}

export function Todolist(props: TodolistPropsType) {

    const [taskTitle, setTaskTitle] = useState('')
    const [status, setStatus] = useState(false)

    const onClickAllHandler = () => {
        props.changeFilter(props.todolistId, 'all')
    }

    const onClickActiveHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }

    const onClickCompletedHandler = () => {
        props.changeFilter(props.todolistId, 'completed')
    }

    const onClickHandler = () => {
        props.addTask(props.todolistId, taskTitle)
        setTaskTitle('')
    }

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onClickRemoveHandler = (taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }

    return <div>
        <h3>
            {props.title}
        </h3>
        <div>
            <input value={taskTitle} onChange={onChangeTaskTitle} />
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>
            {props.tasks.map(t => {
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTasksStatus(props.todolistId, t.id, e.currentTarget.checked )
                }
                return <li key={t.id}>
                    <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                    <span>{t.title}</span>
                    <button onClick={() => onClickRemoveHandler(t.id)}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button onClick={onClickAllHandler}>All</button>
            <button onClick={onClickActiveHandler}>Active</button>
            <button onClick={onClickCompletedHandler}>Completed</button>
        </div>
    </div>
}