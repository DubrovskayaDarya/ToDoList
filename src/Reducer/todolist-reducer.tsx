import {FilterValuesType, ToDoListsType} from "../App";
import {v1} from "uuid";

// Action Types
export type ActionType = removeToDoListActionType | addToDoListActionType | setNewTitleActionType | changeFilterActionType
export type removeToDoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type addToDoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    toDoListId: string
}
export type setNewTitleActionType = {
    type: "SET-NEW-TITLE"
    title: string
    todoListId: string
}
export type changeFilterActionType = {
    type: "CHANGE-FILTER"
    value: FilterValuesType
    todoListId: string
}

// Action Creators
export const removeToDoListActionCreator = (toDoLstId: string): removeToDoListActionType =>
    ({type: "REMOVE-TODOLIST", id: toDoLstId})
export const addToDoListActionCreator = (title: string): addToDoListActionType =>
    ({type: "ADD-TODOLIST", title, toDoListId: v1()})
export const setNewTitleActionCreator = (title: string, todoListId: string): setNewTitleActionType =>
    ({type: "SET-NEW-TITLE", title, todoListId})
export const changeFilterActionCreator = (value: FilterValuesType, todoListId: string): changeFilterActionType =>
    ({type: "CHANGE-FILTER", value, todoListId})



// Reducer
export const todolistReducer = (todolists: Array<ToDoListsType>, action: ActionType): Array<ToDoListsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(t => t.id !== action.id)
        case "ADD-TODOLIST":
            let newToDoListId = action.toDoListId;
            let newToDoList: ToDoListsType = {
                id: newToDoListId,
                title: action.title,
                filter: "all"
            }
            return [...todolists, newToDoList]
        case "SET-NEW-TITLE":
            let toDoList = todolists.find(t => t.id === action.todoListId);
            if (toDoList) {
                toDoList.title = action.title;
            }
            return [...todolists]
        case "CHANGE-FILTER":
            let toDoList1 = todolists.find(t => t.id === action.todoListId);
            if (toDoList1) {
                toDoList1.filter = action.value;
            }
            return [...todolists]
        default: return todolists
    }
}
