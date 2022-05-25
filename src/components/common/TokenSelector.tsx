import React, { useState } from 'react'
import { MenuItem, Select } from '@mui/material';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';

export type Token = {
    value: string,
    alt: string,
    color: string
}

type TokenSelectorProps = {
    tokens: Token[],
    onChange: Function
}

const CustomMenuItem = styled(MenuItem)({
    color: '#fff',
    fontWeight: 'bold'
})


export const TokenSelector = ({tokens, onChange}: TokenSelectorProps) => {

    const [tokenSelected, setTokenSelected] = useState<Token>(tokens[0]);

    const handleSelectToken = (token: Token) => {
        setTokenSelected(token)

        onChange(token);
    }

    return (<Select
        autoWidth
        variant='standard'
        disableUnderline
        id="outlined-select-token"
        renderValue={() => <Icon icon={`cryptocurrency:${tokenSelected?.alt}`} style={{ color: tokenSelected?.color, fontSize: 20 }} />}
        IconComponent={() => null}
        value={tokenSelected}
    >
        {tokens.map((token) => (
            <CustomMenuItem key={token.value} value={token.value} onClick={() => handleSelectToken(token)}>
                <Icon icon={`cryptocurrency:${token.alt}`} style={{ color: token.color, fontSize: 20 }} /><span style={{ marginLeft: 5 }}>{token.value}</span>
            </CustomMenuItem>
        ))}
    </Select>)
}