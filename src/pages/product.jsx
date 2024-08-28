import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import Buttons from '../components/buttons.js';
import TableOne from '../components/tables/TableOne.js';

export default function Product(){
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />
      <Buttons name={"Product"}/>
      <TableOne name={"product"} />
    </DefaultLayout>
  )
}