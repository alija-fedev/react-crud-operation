import { Drawer, Space, Button } from "antd";
import "antd/dist/antd.css";
import { Form, Input } from "antd";
import "../DrawerComponent/DrawerComponent.css"
import { useState, useEffect } from "react";

const DrawerComponent = ({form, onFomDataSubmit, onDrawerOpen, onDrawerClose, onTableDataEdit, editValue, onDataEdit, onDataCancel}) => {

    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState("right");
    const showDrawer = () => {
        setOpen(true);
      };
      const onClose = () => {
        setOpen(false);
      };

      const onFinish = (data) => {
        if(!editValue) {
        onFomDataSubmit(data);
        } else {
            onTableDataEdit(data, onDataEdit);
        }
      }
    
      const onCancel = () => {
        onDataCancel();
      }

    return(
        <>
        <Drawer
            title="Add Details"
            placement={placement}
            closable={false}
            onClose={onDrawerClose}
            open={onDrawerOpen}
            key={placement}
      >
        <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="first_name"
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
          name="last_name"
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

       <div className="buttons">
       
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            onClick={onCancel}
          >
           Cancel
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
          >
           {editValue ? "Update" : "Add"}
          </Button>
        </Form.Item>
       </div>
      </Form>
      </Drawer>
        </>
    )
}

export default DrawerComponent;