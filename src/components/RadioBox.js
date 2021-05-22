import React, { useState, useRef, useEffect } from 'react';
import { Form, Collapse } from 'react-bootstrap';
import SortRoundedIcon from '@material-ui/icons/SortRounded';

const RadioBox = ({ list, handleSort }) => {

    const [open, setOpen] = useState(false);
    const sortRef = useRef();

    const handleToggle = (label) => {
        handleSort(label);
    }
    const sortPrice = list.map(item => {
        return (
            <Form.Check
                defaultChecked={item.id === 1}
                key={item.id}
                type="radio"
                label={item.label}
                id={item.id}
                name='sortBy'
                onChange={() => handleToggle(item.label)}
            />
        )
    });

    const handleOutsideClick = (event) => {
        if (!event.path.includes(sortRef.current)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, [])

    return (
        <div className='mt-2' ref={sortRef}>
            <span onClick={() => setOpen(!open)}>{<SortRoundedIcon />}Сортировка по цене</span>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    {sortPrice}
                </div>
            </Collapse>
        </div>
    )
}

export default RadioBox;