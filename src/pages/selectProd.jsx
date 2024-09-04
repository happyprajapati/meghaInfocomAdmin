// @ts-nocheck
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { IoSearch } from 'react-icons/io5';
// import OneFormField from '../components/oneFieldForm';
import TableOne from '../components/Tables/TableOne';
import { searchContext } from '../context/context';
import { useContext, useEffect } from 'react';
import { IoClose } from "react-icons/io5";

export default function SelectProd() {
  const value = useContext(searchContext);

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
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Select Product" />
        {/* <OneFormField name={'title'} /> */}
        <div className="w-full flex items-center my-3 mx-auto text-lg">
        <IoClose onClick={()=> value.setSearch('')} className='absolute right-7 md:right-10 lg:right-12 xl:right-14 w-5 h-5 cursor-pointer'/>
          <input
            placeholder="Search item..." 
            value={value.search} 
            onChange={(e) => value.setSearch(e.target.value)}
            className="w-full p-2 rounded-md border border-stroke focus:shadow-md outline-none text-md md:text-md lg:text-lg dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            type="text"
          />
        </div>
        <TableOne name={'selectProd'} />
      </DefaultLayout>
    </>
  );
}
