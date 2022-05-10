import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "../../Todolist.module.css";
import {ButtonA} from "../Button/Button";
import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string)=>void
}

export const AddItemForm = (props: AddItemFormType)=>{
    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem();
        }
    }
    const addItem = () => {

        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        }
        else {
            setError(true)
        }
    }

    return(
            <div>
                <TextField
                    label={'Title'}
                    variant={"outlined"}
                    size={"small"}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    error={error}
                    helperText={error && 'Title is required'}
                />

                <IconButton
                    size={"small"}
                    onClick={addItem}>
                    <Add color={"primary"}/>
                </IconButton>
            </div>
    )
}