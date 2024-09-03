import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { tableContext, searchContext } from './context/context.jsx'
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Employees from './pages/employee';
import Category from './pages/category';
import SliderImg from './pages/sliderImg';
import Products from './pages/product';
import Users from './pages/user';
import SelectProd from './pages/selectProd.jsx';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Inquiry from './pages/inquiry.jsx';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const [table, setTable] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://meghainfocom.up.railway.app') {
        return;
      }
      if (event.data.type === 'SET_AUTH_DATA') {
        localStorage.setItem('authToken', event.data.authToken);
        localStorage.setItem('role', event.data.role);
      }
    });
  }, []);
  
  useEffect(() => {
    if(localStorage.getItem('authToken') != null){
      if(localStorage.getItem('role') != 'ROLE_ADMIN'){
        window.location.href = "https://meghainfocom.up.railway.app/unauthorized";
      }
    }else{
      console.log(localStorage.getItem('authToken'))
      window.location.href = "https://meghainfocom.up.railway.app/login";
    }
  }, []);


  return loading ? (
    <Loader />
  ) : (
    <>
    <searchContext.Provider value={{search, setSearch}} >
    <tableContext.Provider value={{table, setTable}} >
      <ToastContainer />
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard | Mcon star" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/employee"
          element={
            <>
              <PageTitle title="Employees" />
              <Employees />
            </>
          }
        />
        <Route
          path="/sliderImg"
          element={
            <>
              <PageTitle title="slider Images" />
              <SliderImg />
            </>
          }
        />
        <Route
          path="/category"
          element={
            <>
              <PageTitle title="Category" />
              <Category />
            </>
          }
        />
        {/* <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        /> */}
        <Route
          path="/product"
          element={
            <>
              <PageTitle title="Product" />
              <Products />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Users" />
              <Users />
            </>
          }
        />
        <Route
          path="/inquiry"
          element={
            <>
              <PageTitle title="Inquiry" />
              <Inquiry />
            </>
          }
        />
        <Route
          path="/selectProd"
          element={
            <>
              <PageTitle title="Select Product" />
              <SelectProd />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Select Product" />
              <Profile />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </tableContext.Provider>
    </searchContext.Provider>
    </>
  );
}

export default App;
