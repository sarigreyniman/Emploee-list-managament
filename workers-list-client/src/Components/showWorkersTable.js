import React, { useEffect, useRef, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, Menu, MenuItem, Button, InputAdornment, OutlinedInput, DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, SaveAlt as SaveAltIcon, Search as SearchIcon, ViewColumn as ViewColumnIcon, Sort as SortIcon, Print as PrintIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import workerSingleton from '../workerSingleTon.js';
import GetAppIcon from '@mui/icons-material/GetApp';
import '../Style/style.css';
import ReactToPrint from 'react-to-print';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function ShowWorkersTable() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const handleClickEdit = (worker) => {
        navigate(`/putWorkerForm/${worker.id}`);
    };
    const [columns, setColumns] = useState([
        { id: 'firstName', label: 'First Name', visible: true },
        { id: 'lastName', label: 'Last Name', visible: true },
        { id: 'workerId', label: 'Worker ID', visible: true },
        { id: 'startWorkDate', label: 'Start Work Date', visible: true },
    ]);
    const [workerToDelete, setWorkerToDelete] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const toggleColumnVisibility = (id) => {
        setColumns((prevColumns) =>
            prevColumns.map((column) => {
                if (column.id === id) {
                    return { ...column, visible: !column.visible };
                }
                return column;
            })
        );
    };

    useEffect(() => {
        console.log("Workers list updated");
    }, [workerSingleton.workersList]);

    const handleClickDelete = (worker) => {
        setWorkerToDelete(worker.id);
        setOpenDialog(true);
    };

    const [openDialog, setOpenDialog] = useState(false);
    const handleDelete = () => {
        if (workerToDelete) {
            workerSingleton.deleteWorker(workerToDelete);
            setOpenDialog(false);
            reloadPage();
        }
    };
    const reloadPage = () => {
        window.location.reload();
    }


    const exportToExcel = (worker) => {
        const csvContent = "data:text/csv;charset=utf-8," +
            [worker.firstName, worker.lastName, worker.workerId, worker.startWorkDate].join(",");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "worker.csv");
        document.body.appendChild(link);
        link.click();
    };

    const exportToExcelAllPage = () => {
        const csvContent = "data:text/csv;charset=utf-8," +
            workerSingleton.workersList
                .filter(worker => worker.isActive !== false)
                .map(worker => [worker.firstName, worker.lastName, worker.workerId, worker.startWorkDate].join(","))
                .join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "workers.csv");
        document.body.appendChild(link);
        link.click();
    };
    const handleClickAddWorker = () => {
        navigate(`/putWorkerForm/0`);
    };
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const componentRef = useRef();

    return (
        <>
            <div className='backgrounds'>
                <div className='buttonsSerachAdd'>
                    <OutlinedInput
                        sx={{
                            borderRadius: '10vh'
                        }}
                        className='outlinedInput'
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: '8vh',
                            height: '7vh',
                            backgroundColor: '#d5edf6',
                            color: 'black',
                            marginRight: '3vw',
                            width: '10vw',
                            '&:hover': {
                                backgroundColor: '#d5edf6',
                                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            },
                        }}
                        onClick={handleClickAddWorker}
                    >
                        <AddIcon />  Add worker
                    </Button>
                </div>


                <Paper className='Paper scrollable-table' >
                    <TableContainer >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead className='tableHead' >
                                <TableRow className='tableRow' sx={{ borderBottom: 'none', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
                                    <TableCell style={{ width: '0.4%'}}>
                                        <Tooltip title="Relaod">
                                            <IconButton onClick={reloadPage}>
                                                <RefreshIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    {columns.map((column) => (
                                        column.visible && (
                                            <TableCell key={column.id} style={{ width: '1.6%' }}>{column.label}</TableCell>
                                        )
                                    ))}
                                    <TableCell style={{ width: '4%'}} ></TableCell>
                                    <TableCell style={{ width: '0.02%' }} >
                                        <Tooltip title="Export to excel">
                                            <IconButton onClick={exportToExcelAllPage}>
                                                <GetAppIcon />
                                            </IconButton>
                                        </Tooltip>

                                    </TableCell>
                                    <TableCell style={{ width: '0.02%' }}>
                                        <Tooltip title="View Column">
                                            <IconButton
                                                onClick={(event) => setAnchorEl(event.currentTarget)}>
                                                <ViewColumnIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell style={{ width: '0.02%' }}>
                                        <ReactToPrint
                                            trigger={() => (
                                                <Tooltip title="Print">
                                                    <IconButton>
                                                        <PrintIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            content={() => componentRef.current}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody ref={componentRef}>
                                {workerSingleton.workersList
                                    .filter(worker => worker.isActive === true)
                                    .filter(worker =>
                                        worker &&
                                        (worker.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            worker.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            worker.workerId.toString().includes(searchTerm))
                                    )
                                    .map((worker) => {
                                        const randomColor = getRandomColor();
                                        return (
                                            <TableRow key={worker.id} className='tableRow' >
                                                <TableCell style={{ position: 'relative' }} sx={{ borderBottom: 'none' }}>
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        width: '30px',
                                                        height: '30px',
                                                        borderRadius: '50%',
                                                        backgroundColor: randomColor,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        color: 'white',
                                                    }}>
                                                        {worker.firstName.charAt(0)}
                                                    </div>
                                                </TableCell>
                                                {columns.map((column) => (
                                                    column.visible && (
                                                        <TableCell key={column.id} sx={{ borderBottom: 'none' }}>{worker[column.id]}</TableCell>
                                                    )
                                                ))}

                                                <TableCell sx={{ borderBottom: 'none' }}>
                                                    <Tooltip title="Edit employee">
                                                        <IconButton onClick={() => handleClickEdit(worker)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete employee">
                                                        <IconButton onClick={() => handleClickDelete(worker)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Export to Excel">
                                                        <IconButton onClick={() => exportToExcel(worker)}>
                                                            <SaveAltIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Menu
                        id="view-column-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        {columns.map((column) => (
                            <MenuItem key={column.id} onClick={() => toggleColumnVisibility(column.id)}>
                                {column.visible ? 'Hide' : 'Show'} {column.label}
                            </MenuItem>
                        ))}
                    </Menu>
                </Paper >


                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this employee?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => handleDelete()} color="primary" >Confirm Delete</Button>
                        <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

