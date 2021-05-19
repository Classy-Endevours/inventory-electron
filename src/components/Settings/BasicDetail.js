/* eslint-disable react/prop-types */
import { Form, Input } from 'antd';
import { NewContentButton } from '../../common/uielements/Collection.style';
import { SpacedTitle } from '../../common/uielements/Typo.style';

const Basic = ({
  initialValues = {
    name: 'Raject Export',
    address: 'sinn bulluin, summon state',
    gstNo: '12121212121',
  },
}) => {
  const [form] = Form.useForm();
  const onSubmit = (values) => {
    console.log({ values });
  };
  const validate = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit({ ...initialValues, ...values });
      })
      .catch(() => {
        console.log('logged');
      });
  };

  return (
    <Form
      style={{ width: '80%' }}
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={initialValues}
    >
      <SpacedTitle level={3}>Basic Information</SpacedTitle>
      <Form.Item
        name="name"
        label="Name of the owner"
        rules={[
          {
            required: true,
            message: 'Please input the owner name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Current Address"
        rules={[
          {
            required: true,
            message: 'Please input the current address!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gstNo"
        label="GST No"
        rules={[
          {
            required: true,
            message: 'Please input the GST Number!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <NewContentButton
          style={{ width: '100px', height: '35px' }}
          type="primary"
          onClick={validate}
          htmlType="submit"
        >
          Save
        </NewContentButton>
      </Form.Item>
    </Form>
  );
};
export default Basic;
