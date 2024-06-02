import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistsType[], action: TodolistsReducerType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            // setTodolists(todolists.filter(el => el.id !== todolistId))
            // delete tasks[todolistId]
            return state.filter(el => el.id !== action.payload.todolistId)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistsType = {id: v1(), title: action.payload.title, filter: 'all'};
            // setTodolists([...todolists, newTodolist])
            // setTasks({...tasks, [newTodolist.id]: []})
            return [...state, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            // setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            //setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
        default:
            return state
    }
}

type TodolistsReducerType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType
type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title
        }
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            title
        }
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todolistId,
            filter
        }
    } as const
}