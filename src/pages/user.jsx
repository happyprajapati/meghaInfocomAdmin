import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import TableOne from '../components/tables/TableOne';

export default function User(){
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <TableOne name={"user"} />
    </DefaultLayout>
  )
}