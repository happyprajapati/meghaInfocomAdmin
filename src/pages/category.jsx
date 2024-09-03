import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import OneFormField from '../components/oneFieldForm';
import TableOne from '../components/Tables/TableOne';
import { useEffect } from 'react';

export default function Category(){
  
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
      <Breadcrumb pageName="Categories" />
      <OneFormField name={'category'} />
      <TableOne name={"category"} />
    </DefaultLayout>
  )
}