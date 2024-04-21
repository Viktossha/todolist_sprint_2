import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}


function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function changeFilter(todolistId: string, value: FilterValuesType) {
        let currentTodolist = todolists.find(t => t.id === todolistId);
        if (currentTodolist) {
            currentTodolist.filter = value;
            setTodolists([...todolists])
        }
    }

    const addTask = (todolistId: string, taskTitle: string) => {
      let newTask = {id: v1(), title: taskTitle, isDone: false}

      setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const removeTask = (todolistId: string, taskId: string) => {
      setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const changeTasksStatus = (todolistId: string, taskId: string, status: boolean) => {
      let todolistsTasks = tasks[todolistId];
      let task = todolistsTasks.find(t => t.id === taskId);

      if (task) {
        task.isDone = status;
        setTasks({...tasks});
      }


      // if (task)
      // setTasks({...tasks, [todolistId]: [...tasks[todolistId], {...task, isDone: status}]})
    }


    return (
        <div className="App">
            {todolists.map(todolist => {
                let tasksForTodolist = tasks[todolist.id]

                if (todolist.filter === 'active') {
                    tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone)
                }

                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasks[todolist.id].filter(t => t.isDone)
                }

                return <Todolist title={todolist.title}
                                 tasks={tasksForTodolist}
                                 todolistId={todolist.id}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 removeTask={removeTask}
                                 changeTasksStatus={changeTasksStatus}

                />
            })}
        </div>
    );
}

export default App;
