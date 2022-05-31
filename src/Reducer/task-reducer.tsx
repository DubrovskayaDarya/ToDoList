import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addToDoListActionType, removeToDoListActionType} from "./todolist-reducer";

// Action Types
export type ActionType =
    removeTaskActionType
    | addTaskActionType
    | changeStatusTaskActionType
    | setTitleTaskActionType
    | addToDoListActionType
    | removeToDoListActionType
export type removeTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string,
    toDoListId: string
}
export type addTaskActionType = {
    type: "ADD-TASK"
    title: string,
    toDoListId: string
}
export type changeStatusTaskActionType = {
    type: "CHANGE-STATUS-TASK"
    isDone: boolean,
    toDoListId: string,
    taskId: string
}
export type setTitleTaskActionType = {
    type: "SET-TITLE-TASK",
    title: string,
    toDoListId: string,
    taskId: string
}

// Action Creators
export const removeTasksActionCreator = (taskId: string, toDoListId: string): removeTaskActionType =>
    ({type: "REMOVE-TASK", taskId, toDoListId});
export const addTasksActionCreator = (title: string, toDoListId: string): addTaskActionType =>
    ({type: "ADD-TASK", title, toDoListId});
export const changeStatusTasksActionCreator = (taskId: string, toDoListId: string, isDone: boolean): changeStatusTaskActionType =>
    ({type: "CHANGE-STATUS-TASK", isDone, taskId, toDoListId});
export const SetTitleTasksActionCreator = (taskId: string, toDoListId: string, title: string): setTitleTaskActionType =>
    ({type: "SET-TITLE-TASK", title, taskId, toDoListId});

// Reducer

export const tasksReducer = (tasks: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...tasks,
                [action.toDoListId]: tasks[action.toDoListId].filter(t => t.id != action.taskId)
            }
        case "ADD-TASK":
            tasks[action.toDoListId] = [{id: v1(), title: action.title, isDone: false}, ...tasks[action.toDoListId]];
            return {...tasks}
        case "CHANGE-STATUS-TASK":
            let task = tasks[action.toDoListId].find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
                return {...tasks}
            }
            return {...tasks}
        case "SET-TITLE-TASK":
            let task1 = tasks[action.toDoListId].find(t => t.id === action.taskId);
            if (task1) {
                task1.title = action.title;
                return {...tasks}
            }
            return {...tasks}
        case "ADD-TODOLIST":
            return {
                ...tasks,
                [action.toDoListId]: []
            }
        default:
            return tasks
    }
}
