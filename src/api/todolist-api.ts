import axios from "axios";

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
};

type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
};

type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
};

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '5a8d76c1-1e2a-49db-b28c-bfbbd3f744da'
    }
});

export const todolistAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>('/todo-lists');
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{item: TodolistType }>>('/todo-lists', {title: title});
        return promise;
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType<Object>>('/todo-lists/' + id);
        return promise;
    },
    updateTodolist(id: string, title: string) {
        const promise = instance.put<ResponseType<Object>>('/todo-lists/' + id, {title: title});
        return promise
    }
}