// import Form from "./component/Form/form";
// import Usememo from "./component/usememo/Memo"
import Register from './page/Register';
import Login from './page/Login';
import Dashboard from './page/Dashboard';

import {BrowserRouter,Route,Routes} from 'react-router-dom'



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path ='/' element={<Register/>}/>
          <Route path ='/login' element={<Login/>}/>
          <Route path ='/dashboard' element={<Dashboard/>}/>
          <Route path ='/dashboard' element={<App/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
    );
}

export default App;
