import {TasksStateType, ToDoListsType} from "../App";
import {addToDoListActionCreator, todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./task-reducer";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<ToDoListsType> = [];

    const action = addToDoListActionCreator("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.toDoListId);
    expect(idFromTodolists).toBe(action.toDoListId);
});
