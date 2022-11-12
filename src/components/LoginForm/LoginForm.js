import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import "../LoginForm/LoginForm.css"

const LoginForm = ({onButtonClick, onFormSwitch, form}) => {
    const onHandleClick = (formdata) => {
        onButtonClick(formdata)
    }
  
      
     
    return(
        <>
        
           <Form
           className="login-form"
      onFinish={onHandleClick}
      autoComplete="off"
      form={form}
    >
                <h1>Login Form</h1>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
     
        <Button className="login-button" type="primary" htmlType="submit">
            Submit
        </Button>
        
      </Form.Item>
           </Form>
           <Button onClick={() => onFormSwitch("registration")}>Don't have an accout? Registration here</Button>
        </>
    )
}

export default LoginForm;