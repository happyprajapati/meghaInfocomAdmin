import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import OneFormField from '../components/oneFieldForm';
import TableOne from '../components/tables/TableOne';

export default function Category(){
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Categories" />
      <OneFormField name={'category'} />
      <TableOne name={"category"} />
    </DefaultLayout>
  )
}