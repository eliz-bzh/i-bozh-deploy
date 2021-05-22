import React, { useState, useRef, useEffect } from 'react';
import { Form, Collapse } from 'react-bootstrap';
import SortRoundedIcon from '@material-ui/icons/SortRounded';

const CheckBox = ({ items, sortBy, handleFilters }) => {

    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([]);
    const filterRef = useRef();

    const handleToggle = (id) => {
        const currentIndex = checked.indexOf(id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);

        handleFilters(newChecked);
    }

    const list = items.map(item => {
        return (
            <Form.Check checked={checked.indexOf(item.id) === -1 ? false : true} inline type="checkbox" label={item.name} key={item.id} value={item.id} onChange={() => handleToggle(item.id)} />
        );
    });

    const handleOutsideClick = (event) => {
        if (!event.path.includes(filterRef.current)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, [])

    return (
        <div className='mt-2' ref={filterRef}>
            <span onClick={() => setOpen(!open)}>{<SortRoundedIcon />}{sortBy}</span>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    {list}
                </div>
            </Collapse>
        </div>
    )
}

export default CheckBox;