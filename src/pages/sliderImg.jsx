import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import OneFormField from '../components/oneFieldForm';
import TableOne from '../components/tables/TableOne';

export default function sliderImg() {
    return (
        <DefaultLayout>
        <Breadcrumb pageName="Slider Images" />
        <OneFormField name={'images'} />
        <TableOne name={"images"} />
      </DefaultLayout>
    )
}
