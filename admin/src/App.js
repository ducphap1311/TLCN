import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AllProductsPage } from './pages/AllProductsPage';
import { AllOrdersPage } from './pages/AllOrdersPage';
import { AllOfferPage } from './pages/AllOfferPage';
import { AllContactPage } from './pages/AllContactPage';
import { AllUsersPage } from './pages/AllUsersPage';
import { AddProductPage } from './pages/AddProductPage';
import { LoginPage } from './pages/LoginPage';
import { DetailOfferPage } from './pages/DetailOfferPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
function App() {
  return (
      <Routes>
        <Route path='/' element={<AddProductPage />} />
        <Route path='/allproducts' element={<AllProductsPage />} />
        <Route path='/allorders' element={<AllOrdersPage />} />
        <Route path='/allusers' element={<AllUsersPage />} />
        <Route path='/alloffer' element={<AllOfferPage />} />
        <Route path='/allcontact' element={<AllContactPage />} />
        <Route path='/detailoffer/:id' element={<DetailOfferPage />} /> 
        <Route path='/login' element={<LoginPage />} />
        <Route path='/orderdetail' element={<OrderDetailPage />} />
      </Routes>
  );
}

export default App;
