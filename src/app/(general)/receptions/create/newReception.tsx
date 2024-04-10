'use client'
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { StayPrimaryLandscape } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import NewInvoiceTable from './NewInvoiceTable/Table';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import customerList from './customerList.json'
import { customers as customerList } from './data/customers';
import { Customer } from './types/Customer';
import { services } from './data/services';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { Patient } from '../../patients/types/Patient';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const NewReception = ({ patientsList }: { patientsList: Patient[] }) => {
  const theme = useTheme()

  const [customer, setCustomer] = useState('');
  const [resolution, setResolution] = useState('');
  // const [customerDetails, setCustomerDetails] = useState<Patient>({

  // });

  const [editCustomerDetails, setEditCustomerDetails] = useState(false);
  const [editFacturation, setEditFacturation] = useState(false);
  const [date, setDate] = useState(dayjs().format('DD MMM YYYY'));
  const [dueDate, setDueDate] = useState(dayjs().add(1, 'month').format('DD MMM YYYY'));
  const [subtotal, setSubtotal] = useState(0);


  // const handleCustomer = (event: SelectChangeEvent) => {
  //   const customerId = Number(event.target.value);
  //   setCustomer(customerId.toString());
  //   const selectedCustomer = customerList.find((customer) => customer.id === customerId);
  //   if (selectedCustomer) {
  //     setCustomerDetails(selectedCustomer);

  //     const customerServices = services.find(
  //       (service) => service.customerId === Number(customerId)
  //     );
  //     if (customerServices) {
  //       const subtotal = customerServices.patients.reduce((acc, patient) => acc + patient.PendingAmount, 0);
  //       setSubtotal(subtotal);
  //     }
  //   }
  // };

  const [patient, setPatient] = useState<Patient | null>(null)

  const handleSelectPatient = (event: SelectChangeEvent) => {
    console.log(event.target.value as string)
    // 
    const patient = patientsList.find((patient) => patient.document_id === event.target.value as string)
    if (patient) {
      setPatient(patient)
      // setCustomerDetails(patient)     
    }
  }

  const editCustomerInfo = () => {
    setEditCustomerDetails(!editCustomerDetails);
  }

  const editFacturationAddress = () => {
    setEditFacturation(!editFacturation);
  }

  const handleResolution = (event: SelectChangeEvent) => {
    setResolution(event.target.value as string);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '1em' }}>
        <Box>
          <h1 style={{ margin: 0 }}>New Invoice</h1>
          <p style={{ margin: 0 }}>Create a new invoice</p>
        </Box>
        <Box sx={{ mr: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1em' }}>
          <Button variant="outlined" sx={{ height: '3em', borderRadius: '100px', backgroundColor: 'transparent', color: `${theme.palette.primary.main}`, textTransform: 'none' }}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ height: '3em', borderRadius: '100px', textTransform: 'none' }}>
            Done
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
        <Box sx={{ mb: '4em' }}>
          <Box sx={{ display: 'flex', gap: '2em', mt: '1em', mb: '2em' }}>
            <p style={{}}>Customer</p>
            {/* Select Customer */}
            <Box sx={{ minWidth: 360, display: 'flex', alignItems: 'center' }} >
              <FormControl fullWidth size="small">
                <InputLabel id="patientLabel">Select Patient</InputLabel>
                <Select
                  labelId="patientLabel"
                  name="patient"
                  id="patient"
                  value={patient !== null ? patient.document_id : ''}
                  label="Select Patient"
                  onChange={handleSelectPatient}
                >
                  {patientsList.map((customer) => (
                    <MenuItem key={customer.document_id} value={customer.document_id}>{customer.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {/* End Select Costumer */}
            <Box sx={{ display: 'flex', }}>
              <Checkbox {...label} defaultChecked />
              <p style={{}}>Send</p>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '2em' }}>
            <Box sx={{ minWidth: '21em', minHeight: '13.5em', fontSize: '80%', '& p': { margin: '0.30em', color: '#827379' } }}>
              <p style={{ color: 'black', }}><b>Customer Details
                <span>
                  <IconButton
                    sx={{ width: '0', height: '0', ml: '0.5em' }}
                    onClick={editCustomerInfo} // It supposed to be eventually a POST request to the server
                  >
                    <EditIcon color="primary" fontSize="small" sx={{ ml: '0.25em' }} />
                  </IconButton>
                </span></b></p>
              {patient && editCustomerDetails === false && (
                <>
                  <p>{patient.name}</p>
                  <p>{patient.last_name}</p>
                  <p>{patient.document_type + "." + patient.document_id}</p>
                  <p>{patient.email}</p>
                  <p>{patient.phone}</p>
                  <p>{patient.birthdate.getFullYear().toString() + " " + patient.birthdate.getMonth().toString() + " " + patient.birthdate.getDay().toString()}</p>
                  <p>{patient.gender}</p>
                </>
              )}
            </Box>
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', padding: '2em', pb: '0', pt: '1em', gap: '1em', justifyContent: 'flex-end' }}>
            <InputLabel htmlFor="invoice" sx={{ display: 'flex', alignItems: 'center' }}>Invoice #</InputLabel>
            <TextField disabled size='small' id="invoice" label="INV1578032" />
            <CalendarMonthOutlinedIcon color="primary" sx={{ ml: '0.25em', alignSelf: 'center', visibility: 'hidden' }} />
          </Box>
          <Box sx={{ display: 'flex', padding: '2em', pb: '0', gap: '1em', justifyContent: 'flex-end' }}>
            <InputLabel htmlFor="date" sx={{ display: 'flex', alignItems: 'center' }}>Date</InputLabel>
            <TextField hiddenLabel size='small' id="date" value={date} />
            <CalendarMonthOutlinedIcon color="primary" sx={{ ml: '0.25em', alignSelf: 'center' }} />
          </Box>
          <Box sx={{ display: 'flex', padding: '2em', pb: '0', gap: '1em', justifyContent: 'flex-end' }}>
            <InputLabel htmlFor="duedate" sx={{ display: 'flex', alignItems: 'center' }}>Due Date</InputLabel>
            <TextField hiddenLabel size='small' id="duedate" value={dueDate} />
            <CalendarMonthOutlinedIcon color="primary" sx={{ ml: '0.25em', alignSelf: 'center' }} />
          </Box>
          <Box sx={{ display: 'flex', padding: '2em', pb: '0', gap: '1em', justifyContent: 'flex-end' }}>
            <InputLabel htmlFor="resolution" sx={{ display: 'flex', alignItems: 'center' }}>Resolution</InputLabel>
            {/* Select Customer */}
            <Box sx={{ minWidth: 223, }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Select Resolution</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={resolution}
                  label="Select Resolution"
                  onChange={handleResolution}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* End Select Costumer */}
            <CalendarMonthOutlinedIcon color="primary" sx={{ ml: '0.25em', alignSelf: 'center', visibility: 'hidden' }} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: '2em' }}>
        <Box sx={{ width: '100%' }}>
          <NewInvoiceTable customerId={customer} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '1em' }}>
        <Box sx={{}}>
          <h2 style={{ margin: 0, fontSize: '1em', display: 'flex' }}><span><SettingsOutlinedIcon sx={{ mr: '0.25em' }} /></span>Options</h2>
          <Box sx={{ ml: '2em' }}>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Show signature" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Show seal" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Show header" />
            </FormGroup>
          </Box>
        </Box>
        <Box sx={{}}>
          <Box sx={{ display: 'flex', pb: '0', pt: '1em', gap: '1em', justifyContent: 'flex-end' }}>
            <InputLabel sx={{ display: 'flex', alignItems: 'center', fontSize: '0.95em' }}>Sub Total</InputLabel>
            <TextField disabled id="filled-basic" hiddenLabel variant="filled" size="small"
              value={subtotal}
              sx={{
                color: 'primary', backgroundColor: 'primary', width: '35%', '& input': { fontSize: '1em' }, '& label': {
                  marginTop: '-0.5em', marginLeft: '0.2em', opacity: '0.8'
                }
              }} />
          </Box>
          <Box sx={{ display: 'flex', pb: '0', pt: '1em', gap: '1em', justifyContent: 'flex-end' }}>
            <InputLabel sx={{ display: 'flex', alignItems: 'center', fontSize: '0.95em' }}>Tax</InputLabel>
            <TextField disabled id="filled-basic"
              // *100 to an undefined value is not possible, so it's been checked
              // value={customerDetails?.customer.TaxRetention !== undefined ? (`${customerDetails?.customer.TaxRetention * 100}%`) : (customerDetails?.customer.TaxRetention)}
              hiddenLabel variant="filled" size="small"
              sx={{
                width: '35%', '& input': { fontSize: '1em' }, '& label': {
                  opacity: '0.8'
                }
              }} />
          </Box>
          <Box sx={{ display: 'flex', pb: '0', pt: '1em', gap: '1em', justifyContent: 'flex-end' }}>
            <InputLabel sx={{ display: 'flex', alignItems: 'center', fontSize: '0.95em' }}>Total</InputLabel>
            <TextField disabled id="filled-basic" hiddenLabel variant="filled" size="small"
              // value={subtotal - (subtotal * customerDetails?.customer.TaxRetention)}
              sx={{
                color: 'primary', backgroundColor: 'primary', width: '35%', '& input': { fontSize: '1em' }, '& label': {
                  marginTop: '-0.5em', marginLeft: '0.2em', opacity: '0.8'
                }
              }} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default NewReception;