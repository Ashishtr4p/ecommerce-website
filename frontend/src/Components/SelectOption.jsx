/* eslint-disable no-confusing-arrow */ 
/* eslint-disable max-len */ 
import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@material-ui/styles';
import { BsChevronDown } from 'react-icons/bs';

const useStyles = makeStyles((theme) => ({
  formControl: {
    '& .MuiOutlinedInput-root': {
      // '& fieldset': {
      //   border: '1px solid',                

      // },
      fontFamily: 'GraphikMedium',
      color: '#292E36',
      fontSize: '14px',
      '&:hover fieldset': {
        borderColor: '#466EFF', // Change the hover border color here
      },
    },
    '& .MuiSelect-icon': {
      color: '#292E36',
      fontSize: '12px',
      right: '11px',
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      borderRadius: '12px',      
      width: 'max-content',
      marginTop: '5px',
      padding: '8px',
      border: '1px solid #E0E6EE',
      boxShadow: ' -1px 3px 18px -7px   rgba(43,112,230,0.5)',
      // minWidth: 150,
      // maxWidth: 1400,
    },
  },

};

export default function SelectOptions({
  label,
  value,
  setValue,
  menuOptions,
  size,
  minWidth,
  maxHeight,
  disabled,
  maxWidth,
  usedIn,
  handleCustomeChange,
  actionId,
}) {
  const handleChange = (event) => {
    if (usedIn === 'users') {
      handleCustomeChange(event);
    } else if (usedIn === 'agents') {
      setValue((prevActions) => (
        prevActions.map((inaction) => inaction.id === actionId ? { ...inaction, type: event.target.value } : inaction)
      ));
    } else if (usedIn === 'agentsAssign') {
      setValue((prevActions) => (
        prevActions.map((inaction) => inaction.id === actionId ? { ...inaction, transfer_to_account_id: event.target.value } : inaction)
      ));
    } else {
      setValue(event.target.value);
    }
  };

  const classes = useStyles();
  return (
    <Box sx={{ minWidth, maxWidth }}>
      <FormControl
        className={`hover:!ring-4 shadow-sm shadow-gray-200 hover:!border-[1px] border !bg-white          
         rounded-[11px] outline-none
           hover:!ring-blue-200 hover:!border-blue-500 medium
         ${classes.formControl}`}
        fullWidth
        size={size}
      >
        <InputLabel sx={{ fontFamily: 'GraphikMedium',color: '#292E36' }} className="!text-sm" id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          MenuProps={MenuProps}
          label={label}
          sx={{ fontFamily: 'GraphikMedium' }}
          onChange={handleChange}
          IconComponent={BsChevronDown}
          disabled={disabled}   
          className="!rounded-[10px]"
          defaultValue=""
        >
          {menuOptions?.map((menu) => (
            <MenuItem            
              className="hover:!bg-[#466EFF] !mt-1 hover:!text-white !rounded-[10px] !text-[#1a202c]"
              key={menu.value}
              value={menu.value}
            >
              {menu.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
