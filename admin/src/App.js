import {Routes, Route} from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AllProductsPage } from './pages/AllProductsPage';
import { AllOrdersPage } from './pages/AllOrdersPage';
import { AllUsersPage } from './pages/AllUsersPage';
import { AddProductPage } from './pages/AddProductPage';

function App() {
  return (
      <Routes>
        <Route path='/' element={<AddProductPage />} />
        <Route path='/allproducts' element={<AllProductsPage />} />
        <Route path='/allorders' element={<AllOrdersPage />} />
        <Route path='/allusers' element={<AllUsersPage />} />
      </Routes>
  );
}

export default App;
