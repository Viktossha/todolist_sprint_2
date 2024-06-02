import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";


type CheckboxPropsType = {
    onChange: (e: boolean) => void
    checked: boolean
}

export const CustomCheckbox = ({onChange, checked}: CheckboxPropsType) => {
    const onChangeHandler = (e:  ChangeEvent<HTMLInputElement> ) => {
        onChange(e.currentTarget.checked)
    }
    return (
        <Checkbox onChange={onChangeHandler}
                  checked={checked} />
    );
};