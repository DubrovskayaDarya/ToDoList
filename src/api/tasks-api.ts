import axios from "axios";


type TaskType = {
    id: string
    title: string
    description: null
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: null
    deadline: null
    addedDate: string
};

type TasksType<D> = {
    items: D
    totalCount: number
    error: null | string
};

type TaskResponseType<D> = {
    data: D
    messages: Array<string | null>
    fieldsErrors: Array<string | null>
    resultCode: number
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '5a8d76c1-1e2a-49db-b28c-bfbbd3f744da'
    }
});


export const tasksAPI = {
    getTasks(todolistId: string) {

        return instance.get<TasksType<Array<TaskType>>>('/todo-lists/'+ todolistId + '/tasks');
    },
    createTask(title: string, todolistId: string) {

        return instance.post<TaskResponseType<TasksType<TaskType>>>('/todo-lists/' + todolistId + '/tasks', {title: title});
    },
    updateTask(taskId: string, todolistId: string, title: string) {

        return instance.put<TaskResponseType<TasksType<TaskType>>>('/todo-lists/' + todolistId + '/tasks/' + taskId, {title: title});
    },
    deleteTask(taskId: string, todolistId: string) {

        return instance.delete<TaskResponseType<null>>('/todo-lists/' + todolistId + '/tasks/' + taskId);
    }
}