import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import Buttons from '../components/buttons';
import TableOne from '../components/Tables/TableOne';
import { useEffect } from 'react';

export default function Product(){
  
  useEffect(() => {
    if(localStorage.getItem('authToken') != null){
      if(localStorage.getItem('role') != 'ROLE_ADMIN'){
        window.location.href = "https://meghainfocom.up.railway.app/unauthorized";
      }
    }else{
      window.location.href = "https://meghainfo-admin.up.railway.app/login";
    }
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />
      <Buttons name={"Product"}/>
      <TableOne name={"product"} />
    </DefaultLayout>
  )
}