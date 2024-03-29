import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";
export type ToDoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
};
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
};
export type TasksStateType = {
    [toDoListId: string]: Array<TaskType>
};

function App() {

    let firstToDoList = v1();
    let secondToDoList = v1();

    let [toDoLists, setToDoList] = useState<Array<ToDoListsType>>([
        {id: firstToDoList, title: 'What to learn', filter: "all"},
        {id: secondToDoList, title: 'What to buy', filter: "all"},
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [firstToDoList]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}],
        [secondToDoList]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Water", isDone: false},
        ]
    });

    // Task Function
    function removeTask(id: string, toDoListId: string) {
        let task = tasks[toDoListId].filter(t => t.id !== id);
        tasks[toDoListId] = task;
        setTasks({...tasks});
    }
    function setNewTitle (taskId: string, title: string, todoListId: string) {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)
        })
    }
    function addTask(title: string, toDoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasksNew = tasks[toDoListId];
        let newTasks = [task, ...tasksNew];
        tasks[toDoListId] = newTasks;
        setTasks({...tasks});
    }
    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todoListId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === taskId);
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    // To Do List Function
    function changeToDoListFilter(value: FilterValuesType, id: string) {
        let toDoList = toDoLists.find(t => t.id === id);
        if (toDoList) {
            toDoList.filter = value;
            setToDoList([...toDoLists])
        }
    }
    function changeToDoListTitle(title: string, toDoListId: string) {
        let toDoList = toDoLists.find(t => t.id === toDoListId);
        if (toDoList) {
            toDoList.title = title;
            setToDoList([...toDoLists])
        }
    }
    function removeToDoList(toDoListId: string) {
        let toDoList = toDoLists.filter(t => t.id !== toDoListId)
        setToDoList(toDoList)
    }
    function addToDoList(title: string) {
        let newToDoListId = v1();
        let newToDoList: ToDoListsType = {
            id: newToDoListId,
            title: title,
            filter: "all"
        }
        setToDoList([...toDoLists, newToDoList])
        setTasks({...tasks, [newToDoListId]: []})
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between", backgroundColor: "purple"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>LogOut</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {toDoLists.map((t) => {
                        let tasksForTodolist = tasks[t.id];

                        if (t.filter === "active") {
                            tasksForTodolist = tasks[t.id].filter(t => !t.isDone);
                        }
                        if (t.filter === "completed") {
                            tasksForTodolist = tasks[t.id].filter(t => t.isDone);
                        }

                        return (<Grid item key={t.id}>
                                <Paper
                                    elevation={12}
                                    style={{padding: "20px", backgroundColor: "lightpink"}}>
                                    <Todolist
                                        key={t.id}
                                        toDoListId={t.id}
                                        title={t.title}
                                        tasks={tasksForTodolist}
                                        filter={t.filter}

                                        removeTask={removeTask}
                                        changeFilter={changeToDoListFilter}
                                        addTask={addTask}
                                        removeToDoList={removeToDoList}
                                        setNewTitle={setNewTitle}
                                        changeToDoListTitle={changeToDoListTitle}
                                        changeStatus={changeStatus}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
