import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type AddItemFormPropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = (props:AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {  //локальный стейт добавить в глобальный
        if (title.trim() !== "") {
            props.callBack(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const styles = {
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px',
        backgroundColor: 'black'
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       label={error ? error : 'Type something'}
                       variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                       size={'small'}
                       error={!!error}
            />
            <Button onClick={addTask} variant={"contained"} size={"small"} style={styles}>+</Button>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};