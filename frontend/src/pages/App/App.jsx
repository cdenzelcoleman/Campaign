import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx'; 

const App = () => {
  return (
    <div>
      <NavBar />
      <Outlet /> 
    </div>
  );
};

export default App;
