import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import React, { useState } from 'react';

const ToggleButtons = ({ items, variant, value, onChange }) => {

    const [checked, setChecked] = useState(0);

    const handleClick = (index) => {
        if (typeof value === 'boolean') {
            onChange(!value);
        } else { onChange(index); }
        setChecked(index);
    }

    return (
        <ToggleButtonGroup className='d-flex justify-content-center align-items-center' type="radio" name="options" defaultValue={checked}>
            {items && items.map((item, index) =>
                <ToggleButton key={index} value={index} variant={variant} checked={checked === index} onChange={() => handleClick(index)}>{item}</ToggleButton>
            )}
        </ToggleButtonGroup>
    )
}

export default ToggleButtons;