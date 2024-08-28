import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import TableOne from '../components/tables/TableOne';
import OneFormField from '../components/oneFieldForm';

export default function sliderImg() {
    return (
        <DefaultLayout>
        <Breadcrumb pageName="Slider Images" />
        <OneFormField name={'images'} />
        <TableOne name={"images"} />
      </DefaultLayout>
    )
}
