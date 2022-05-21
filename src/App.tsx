import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppBarTop } from './components/common/AppBarTop';
import { AppTheme } from './components/common/AppTheme';
import AccountDashboard from './pages/AccountDashboard';
import { initWeb3 } from './services/web3service';

const App = (): JSX.Element => {
    
    const dispatch = useDispatch();

    useEffect(() => {
     dispatch(initWeb3());
    },[])

    return (
        <AppTheme>
            <AppBarTop />
            <AccountDashboard />
        </AppTheme>
    )
}

export default App;
