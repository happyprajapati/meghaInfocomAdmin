import { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import DefaultLayout from '../layout/DefaultLayout';

export default function User(){
  
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
      <Breadcrumb pageName="Users" />
      <TableOne name={"user"} />
    </DefaultLayout>
  )
}