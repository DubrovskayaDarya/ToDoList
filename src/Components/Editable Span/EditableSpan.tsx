import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanType = {
    title: string
    setNewTitle: (newTitle: string) => void
}


export const EditableSpan = (props: EditableSpanType) => {
    let [title, setTitle] = useState(props.title)
    let [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
       setEditMode(false);
       props.setNewTitle(title)}
    const EditInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const EditModeKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
     if (e.charCode===13) {offEditMode()}
    }

    return (
        editMode
            ? <input
                onChange={EditInputHandler}
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onKeyPress={EditModeKeyPress}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
}