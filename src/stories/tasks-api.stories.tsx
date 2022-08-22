import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = 'a656b822-a608-4604-bebe-e1c69f97af5d';

    useEffect(() => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);

    const title = '3 friends';
    const todolistId = 'a656b822-a608-4604-bebe-e1c69f97af5d';

    useEffect(() => {
        tasksAPI.createTask(title, todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
};

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const taskId = '27e3adba-0634-4474-9851-635480c8e22a';
        const todolistId = 'a656b822-a608-4604-bebe-e1c69f97af5d';
        const title = 'Updated Title';

        tasksAPI.updateTask(taskId, todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
};

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const taskId = '27e3adba-0634-4474-9851-635480c8e22a';
        const todolistId = 'a656b822-a608-4604-bebe-e1c69f97af5d';

        tasksAPI.deleteTask(taskId, todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
};
