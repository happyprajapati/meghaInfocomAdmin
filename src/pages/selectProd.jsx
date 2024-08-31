// @ts-nocheck
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { IoSearch } from 'react-icons/io5';
import OneFormField from '../components/oneFieldForm';
import TableOne from '../components/Tables/TableOne';
import { searchContext } from '../context/context';
import { useContext, useEffect } from 'react';

export default function SelectProd() {
  const value = useContext(searchContext);

  useEffect(() => {
    console.log(value.search);
  }, [value.search]);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Select Product" />
        <OneFormField name={'title'} />
        <div className="w-full flex items-center space-x-2 my-3 mx-auto text-lg">
          <input
            placeholder="Search item..."  
            onChange={(e) => value.setSearch(e.target.value)}
            className="block w-full p-2 rounded-md border border-stroke focus:shadow-md outline-none text-md md:text-md lg:text-lg dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            type="text"
          />
          {/* <button
                type="submit"
                className="w-fit mx-2 px-4 py-2.5 bg-blue-500 text-white rounded-md"
              >
                <IoSearch />
            </button> */}
        </div>
        <TableOne name={'selectProd'} />
      </DefaultLayout>
    </>
  );
}
