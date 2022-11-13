import "antd/dist/antd.css";
import { Form, Input, DatePicker, Button } from "antd";
import "../RegistrationForm/RegistrationForm.css";

const RegistrationForm = ({form, onFormValueSubmit, onFormSwitch, onFormChange}) => {
    
    const onFinish = (data) => {
        onFormValueSubmit(data);
        onFormChange("login")
    }

  return (
    <>
    
      <Form 
        className="registration-form"
        onFinish={onFinish}
        form={form}
        >
            <h1>Registration Form</h1>
        <Form.Item
          name="firstname"
          label="Firstname"
          rules={[
            {
              required: true,
              message: "Please enter your firstname",
            },
            {
              whitespace: true,
              message: "Blankspace should not be allowed",
            },
            {
              min: 3,
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your firstname" />
        </Form.Item>

        <Form.Item
          name="lastname"
          label="Lastname"
          rules={[
            {
              required: true,
              message: "Please enter your lastname",
            },
            {
              whitespace: true,
              message: "Blankspace should not be allowed",
            },
            {
              min: 3,
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your lastname" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
            {
              type: "email",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item 
            label="Date of Birth"
            name= "dob"
            rules={[
            {
                required: true,
                message: "Please select your dob",
            }
            ]}>
          <DatePicker />
        </Form.Item>

        <Form.Item>
          <Button
            className="reg-button"
            type="primary"
            htmlType="submit"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={() => onFormSwitch("login")}>Already have an accout? Login here</Button>
    </>
  );
};

export default RegistrationForm;
