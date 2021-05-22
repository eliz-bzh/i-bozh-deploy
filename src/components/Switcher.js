import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeDarkMode } from '../redux/actions/ActionDarkMode';

const Switcher = () => {

    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.darkModeReducer.darkMode);

    const myFunction = () => {
        dispatch(changeDarkMode(!darkMode));
        var element = document.body;
        (!darkMode) ? (element.classList.add("dark-mode")) : (element.classList.remove("dark-mode"));
    }

    return (
        <label id="switch" className="switch">
            <input type="checkbox" onChange={() => myFunction()} id="slider" checked={darkMode} />
            <span className="slider round"></span>
        </label>
    )
};

export default Switcher;