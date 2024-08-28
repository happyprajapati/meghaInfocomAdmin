import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import Buttons from '../components/buttons';
import TableOne from '../components/tables/TableOne';

export default function Employee(){
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Employees" />
      <Buttons name={"Employee"}/>
      <TableOne name={"employee"} />
    </DefaultLayout>
  )
}