import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/tables/TableOne';
import DefaultLayout from '../layout/DefaultLayout';

export default function User(){
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <TableOne name={"user"} />
    </DefaultLayout>
  )
}