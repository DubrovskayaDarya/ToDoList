import React from "react";
import {MouseEvent} from "react";
import {Button} from "@material-ui/core";
import {FilterValuesType} from "../../App";


type ButtonType = {
    name: string
    callback: () => void
    className?: string
    filter?: FilterValuesType
}

export const ButtonA = (props: ButtonType) => {
    const onclickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        props.callback()
    }
    return (
        <Button size={"small"}
                data-filter={props.filter}
                variant={"outlined"}
                disableElevation
                color={props.filter === "all" ? "primary" : "secondary"}
                onClick={onclickHandler}>{props.name}</Button>
    )
}