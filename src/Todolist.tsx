import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {CustomCheckbox} from "./Checkbox";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitleHandler: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodoListTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    //let [title, setTitle] = useState("")
    //let [error, setError] = useState<string | null>(null)

    // const addTask = () => {
    //     if (title.trim() !== "") {
    //         props.addTask(props.todolistId, title.trim());
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    //
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");

    const removeTodolistHandler = () => props.removeTodolist(props.todolistId);

    const onChangeHandler = (isDone: boolean, id: string) => {
        props.changeTaskStatus(props.todolistId, id, isDone);
    }


    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)  //id мы берем сверху (из App), а title снизу (из AddItemForm)
    }

    const onChangeTitleHandler = (taskId:string, newTitle: string) => {
        props.changeTaskTitleHandler(props.todolistId, taskId, newTitle);
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.todolistId, newTitle)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
            {/*{props.title}*/}
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <DeleteIcon />
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={onChangeHandler}*/}
        {/*           onKeyPress={onKeyPressHandler}*/}
        {/*           className={error ? "error" : ""}*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*    {error && <div className="error-message">{error}</div>}*/}
        {/*</div>*/}
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    // }

                    // const onChangeTitleHandler = (newTitle: string) => {
                    //     props.changeTaskTitleHandler(props.todolistId, t.id, newTitle);
                    // }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<Checkbox onChange={onChangeHandler}*/}
                        {/*          checked={t.isDone} />*/}
                        <CustomCheckbox onChange={(isDone) => onChangeHandler(isDone, t.id)} checked={t.isDone}/>
                        {/*<span>{t.title}</span>*/}
                        <EditableSpan title={t.title} onChange={(title) => onChangeTitleHandler(t.id, title)}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler} color={'secondary'}>Active</Button>
            <Button variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler} color={'success'}>Completed</Button>
        </div>
    </div>
}
