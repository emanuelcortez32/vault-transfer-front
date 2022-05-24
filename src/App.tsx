import { CssBaseline } from '@mui/material';
import { AppBarTop } from './components/common/AppBarTop';
import { AppTheme } from './components/common/AppTheme';
import { Home } from './pages/Home';
import { Routes, Route } from "react-router-dom";

const App = (): JSX.Element => {
    
    return (
        <AppTheme>
            <CssBaseline />
            <AppBarTop />
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/transfer' element={<Home />}/>
                <Route path='/pools' element={<div>POOLS</div>}/>
            </Routes>
        </AppTheme>
    )
}

export default App;
