import React from 'react';
import {Checkbox} from "@mui/material";


type CheckboxPropsType = {
    onChange: any
    checked: boolean
}

export const CustomCheckbox = ({onChange, checked}: CheckboxPropsType) => {
    return (
        <Checkbox onChange={onChange}
                  checked={checked} />
    );
};