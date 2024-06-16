import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, IconButton, Drawer, MenuItem, Select, FormControl, TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper, Input } from '@mui/material';
import workerSingleton from '../workerSingleTon.js';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import WorkIcon from '@mui/icons-material/Work';
import BadgeIcon from '@mui/icons-material/Badge';
import TransgenderIcon from '@mui/icons-material/Transgender';
import AddIcon from '@mui/icons-material/Add';
import positionSingleTon from "../positionSingleTon.js";
import { observer } from 'mobx-react-lite';
import { useFieldArray, useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@material-ui/core';

const PutWorkerForm = observer(() => {
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { workerId } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (updatePositions === true) {
      setUpdatePositions(false)
    }
    else {
      setUpdatePositions(true);
    }
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  useEffect(() => {
    if (workerId === "0" && worker === null) {
      setIsAdd(true);
    } else {
      const workerToApdate = workerSingleton.workersList.find(worker => worker.id === parseInt(workerId));
      setWorker(workerToApdate);
      setIsEdit(true);
    }
  }, [workerId, worker]);

  useEffect(() => {
    setValue('firstName', worker?.firstName || "");
    setValue('lastName', worker?.lastName || "");
    setValue('password', worker?.password || "");
    setValue('workerId', worker?.workerId || "");
    setValue('startWorkDate', worker?.startWorkDate || "");
    setValue('birthDate', worker?.birthDate || "");
    setValue('gender', worker?.gender || "");
    setValue('positions', worker?.positions || [
      {
        positionName: "CEO",
        isAdministrative: true,
        startPositionDate: "2024-04-08T11:27:06.495Z"
      }
    ]);
  }, [worker, setValue]);


  const [updatePositions, setUpdatePositions] = useState(false);
  useEffect(() => {
    setValue('positions', worker?.positions || [
      {
        positionName: " ",
        isAdministrative: true,
        startPositionDate: "2024-04-08T11:27:06.495Z"
      }
    ])
  }, [updatePositions])
  const { fields, append, remove } = useFieldArray({ control, name: "positions" });

  return (
    <>
    <div className='backgrounds'>
      <div className='allForm'>
        <div>
          <IconButton onClick={() => navigate('/')} className='arrowIcon'>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <form className='form' onSubmit={handleSubmit((data) => {
           data.startWorkDate = new Date(data.startWorkDate);
           data.birthDate = new Date(data.birthDate);
          if (isEdit) {
            workerSingleton.putWorker(workerId, data);
            navigate('/');
          } else {
            console.log(data);
            workerSingleton.postWorker(data);
            navigate('/');
          }
        })}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className='textField'
                label="First Name"
                name="firstName"
                InputProps={{ startAdornment: <PersonIcon style={{ color: '#7bb0c4' }} /> }}
                {...register("firstName", { required: true })}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className='textField'
                label="Last Name"
                name="lastName"
                InputProps={{ startAdornment: <PersonIcon style={{ color: '#7bb0c4' }} /> }}
                {...register("lastName", { required: true })}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className='textField'
                label="Password"
                name="password"
                InputProps={{ startAdornment: <PersonIcon style={{ color: '#7bb0c4' }} /> }}
                {...register("password", { required: true })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className='textField'
                label="Worker ID"
                name="workerId"
                InputProps={{ startAdornment: <BadgeIcon style={{ color: '#7bb0c4' }} /> }}
                {...register("workerId", { required: true, pattern: /^\d{9}$/ })}
                error={Boolean(errors.workerId)}
                helperText={errors.workerId?.type === 'required' ? 'Worker ID is required' : 'Worker ID must be a 9-digit number'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className='textField'
                label="Start Work Date"
                name="startWorkDate"
                type='datetime-local'
                InputProps={{ startAdornment: <WorkIcon style={{ color: '#7bb0c4' }} /> }}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("startWorkDate", { required: true })}
                error={Boolean(errors.startWorkDate)}
                helperText={errors.startWorkDate?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className='textField'
                label="Birth Date"
                name="birthDate"
                type='datetime-local'
                InputProps={{
                  startAdornment: <EventIcon style={{ color: '#7bb0c4' }} />,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("birthDate", { required: true })}
                error={Boolean(errors.birthDate)}
                helperText={errors.birthDate?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <Select
                  className='textField'
                  labelId="gender-select"
                  name="gender"
                  defaultValue={worker ? worker.gender : "male"}
                  inputProps={{ id: 'gender-select' }}
                  {...register("gender", { required: true })}
                  error={Boolean(errors.gender)}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} className='buttonsEdit'>
              <Button variant="contained" color="primary" type="submit" sx={{
                height: '5vh',
                backgroundColor: '#7bb0c4',
                color: 'black',
                width: '11vw',
                '&:hover': {
                  backgroundColor: '#7bb0c4',
                  boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.25)',
                },
              }}>
                {isEdit ? "Save" : "Add Worker"}
              </Button>

              <Button variant="contained" color="primary" type="button" onClick={toggleDrawer('right', true)} sx={{
                height: '5vh',
                backgroundColor: '#7bb0c4',
                color: 'black',
                width: '10vw',
                '&:hover': {
                  backgroundColor: '#7bb0c4',
                  boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.25)',
                },
              }}>
                Edit position
              </Button>
            </Grid>

          </Grid>
          <Drawer anchor='right' open={state['right']} onClose={toggleDrawer('right', false)}>
            <div className='drawer'>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Position Name</TableCell>
                      <TableCell>Administrative</TableCell>
                      <TableCell>Start Position Date</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fields.map((position, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ width: '10vw' }}>
                          <Select
                            className='textField'
                            label="Position"
                            defaultValue={position.positionName}
                            {...register(`positions[${index}].positionName`, { required: true })}
                            error={Boolean(errors.positions?.[index]?.positionName)}
                          >
                            {positionSingleTon.positionsListNames.map((positionName) => (
                              (!worker || !worker.positions.some((p) => p.positionName === positionName) || position.positionName === positionName) && (
                                <MenuItem key={positionName} value={positionName}>
                                  {positionName}
                                </MenuItem>
                              )
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            defaultValue={position.isAdministrative}
                            {...register(`positions[${index}].isAdministrative`, { required: true })}
                            error={Boolean(errors.positions?.[index]?.isAdministrative)}
                          >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <TextField
                            className='textField'
                            label="Start Position Date"
                            name={`positions[${index}].startPositionDate`}
                            type='datetime-local'
                            InputProps={{
                              inputProps: {
                                min: worker ? worker.startWorkDate : ''
                              }
                            }}
                            {...register(`positions[${index}].startPositionDate`, { required: true })}
                            error={Boolean(errors.positions?.[index]?.startPositionDate)}
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Delete position">
                            <IconButton aria-label="delete" onClick={() => remove(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button variant='contained' className='buttonAddPosition' startIcon={<AddIcon style={{ color: '#7bb0c4' }} />} color='primary' type='button' onClick={() => append({ positionName: '', isAdministrative: false, startPositionDate: '' })} sx={{
                height: '4vh',
                backgroundColor: '#7bb0c4',
                color: 'black',
                width: '11vw',
                marginLeft: '40vw',
                '&:hover': {
                  backgroundColor: '#7bb0c4',
                  boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.25)',
                },
              }}>
                Add Position
              </Button>
            </div>
          </Drawer>
        </form>
      </div>
      </div>
    </>
  );
});

export default PutWorkerForm;