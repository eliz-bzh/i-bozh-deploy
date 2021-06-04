import React from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const ExportCSV = ({ hidden, fileName, buttonHidden }) => {

    const exportToCSV = (fileName) => {
        axios({
            url: `https://i-bozh-server.herokuapp.com/api/Order/excelCart`,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}.xlsx`);
            document.body.appendChild(link);
            link.click();
            buttonHidden(!hidden); // change state buttonHidden
        });
    }

    return (
        <Button className='mr-2' variant="outline-dark" hidden={hidden} onClick={(e) => exportToCSV(fileName)}>Чек</Button>
    )
}

export default ExportCSV;