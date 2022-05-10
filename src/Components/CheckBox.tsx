import React from "react";
import {ChangeEvent} from "react";
import {Checkbox} from "@material-ui/core";

type CheckBoxType = {
    isDone: boolean
    setStatus: (isDone: boolean)=>void
}

export const CheckBox=(props:CheckBoxType )=>{

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.setStatus(props.isDone)
    }
    return(
        <Checkbox
            size={"small"}
            color={"primary"}
            onChange={onChangeHandler}
            checked={props.isDone}/>
    )
}