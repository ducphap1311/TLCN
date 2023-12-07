import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AllProductsPage } from './pages/AllProductsPage';
import { AllOrdersPage } from './pages/AllOrdersPage';
import { AllOfferPage } from './pages/AllOfferPage';
import { AllContactPage } from './pages/AllContactPage';
import { AllUsersPage } from './pages/AllUsersPage';
import { AddProductPage } from './pages/AddProductPage';
import { DetailOfferPage } from './pages/DetailOfferPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<AddProductPage />} />
      <Route path='/allproducts' element={<AllProductsPage />} />
      <Route path='/allorders' element={<AllOrdersPage />} />
      <Route path='/allusers' element={<AllUsersPage />} />
      <Route path='/alloffer' element={<AllOfferPage />} />
      <Route path='/allcontact' element={<AllContactPage />} />
      <Route path='/detailoffer' element={<DetailOfferPage />} />
    </Routes>
  );
}

export default App;
