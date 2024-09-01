import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import DefaultLayout from '../layout/DefaultLayout';

export default function Inquiry(){
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Inquiry" />
      <TableOne name={"inquiry"} />
    </DefaultLayout>
  )
}