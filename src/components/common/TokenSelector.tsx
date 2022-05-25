import React from 'react'
import { MenuItem, TextField } from '@mui/material';
import { Icon } from '@iconify/react';

const tokens = [
    {
        value: 'Ethereum',
        alt: 'eth',
        color: '#7203ee'
    },
    {
        value: 'DAI',
        alt: 'dai',
        color: '#f1c40f'
    },
    {
        value: 'USDC',
        alt: 'usdc',
        color: '#2980b9'
    },
    {
        value: 'Tether',
        alt: 'usdt',
        color: '#28b463'
    },
];

export const TokenSelector = () => (<TextField
    id="outlined-select-token"
    select
    //value={currency}
    //onChange={handleChange}
  >
    {tokens.map((option) => (
      <MenuItem key={option.value} value={option.value}>
          <Icon icon={`cryptocurrency:${option.alt}`} style={{color: option.color}} />
      </MenuItem>
    ))}
  </TextField>)