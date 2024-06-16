import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import ShowWorkersTable from './Components/showWorkersTable';
import PutWorkerForm from './Components/putWorkerForm';
import './Style/style.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route path={""} element={<ShowWorkersTable />} ></Route>
            <Route path={"putWorkerForm/:workerId"} element={<PutWorkerForm />} ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



function Layout() {
  return (
    <div>
      <header className='header'>
      </header>
      <Outlet />
    </div>
  );
}