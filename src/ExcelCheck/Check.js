import React from 'react'
import Button from 'react-bootstrap/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ExportCSV = ({hidden, csvData, fileName, buttonHidden}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData); // add data list
        ws['!cols'] = [{ width: 35 }, { width: 16 }, { width: 12 }, { width: 15 } ]; // width cells in file
        const wb = { Sheets: { 'Check': ws }, SheetNames: ['Check'] }; // name file and worksheet
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' }); // write
        const data = new Blob([excelBuffer], {type: fileType}); // create file
        FileSaver.saveAs(data, fileName + fileExtension); // download and save file
        buttonHidden(!hidden); // change state buttonHidden
    }

    return (
        <Button className='mr-2' variant="outline-dark" hidden={hidden} onClick={(e) => exportToCSV(csvData,fileName)}>Чек</Button>
    )
}

export default ExportCSV;