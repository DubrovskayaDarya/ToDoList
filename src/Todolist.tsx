import React from 'react';
import {FilterValuesType} from './App';
import {ButtonA} from "./Components/Button/Button";
import {CheckBox} from "./Components/CheckBox";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {EditableSpan} from "./Components/Editable Span/EditableSpan";
import {ButtonGroup, IconButton, List, ListItem} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    toDoListId: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, toDoListId: string) => void
    changeFilter: (value: FilterValuesType, id: string) => void
    addTask: (title: string, toDoListId: string) => void
    filter: FilterValuesType
    removeToDoList: (toDoListId: string) => void
    setNewTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeToDoListTitle: (title: string, toDoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.toDoListId)
    }
    const onAllClickHandler = () => props.changeFilter("all", props.toDoListId);
    const onActiveClickHandler = () => props.changeFilter("active", props.toDoListId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.toDoListId);
    const removeToDoList = () => {
        props.removeToDoList(props.toDoListId)
    }
    const changeToDoListTitle = (newTitle: string) => {
        props.changeToDoListTitle(newTitle, props.toDoListId)
    }


    return (
        <div>
            <h3>
                <IconButton
                    size ={"small"}
                    onClick={removeToDoList}>
                    <DeleteOutline/>
                </IconButton>
                <EditableSpan title={props.title} setNewTitle={changeToDoListTitle}/>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.toDoListId)
                    const setStatus = (isDone: boolean) => {
                        props.changeStatus(t.id, !isDone, props.toDoListId)
                    }
                    const setNewTitle = (newTitle: string) => {
                        props.setNewTitle(t.id, newTitle, props.toDoListId)
                    }
                    return <li key={t.id}>
                        <CheckBox isDone={t.isDone} setStatus={setStatus}/>
                        <EditableSpan title={t.title} setNewTitle={setNewTitle}/>
                        <IconButton
                            size = {"small"}
                            onClick={onClickHandler}>
                            <DeleteOutline/>
                        </IconButton>
                    </li>
                })
                }
            </List>
            <div>
                <ButtonGroup size={"small"}>
                <ButtonA filter={'all'} name={"All"}
                         callback={onAllClickHandler}/>
                <ButtonA filter={'active'} name={"Active"}
                         callback={onActiveClickHandler}/>
                <ButtonA filter={'completed'} name={"Completed"}
                         callback={onCompletedClickHandler}/>
                </ButtonGroup>
            </div>
        </div>
    )
}
