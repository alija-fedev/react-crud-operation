import DrawerComponent from "../../components/DrawerComponent/DrawerComponent";
import TableLists from "../../components/TableLists/TableLists";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import { Form, Button, notification, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckCircleTwoTone, DeleteOutlined } from '@ant-design/icons';

const DetailsPage = () => {
  const navigate = useNavigate();
  const [tableDatas, setTableDatas] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editValue, setEditValue] = useState(false);
  const [onDataEdit, setOnDataEdit] = useState(null);
  const [form] = Form.useForm();

  // add form
  const onFormSubmit = (formDetails) => {
    const newValue = {
      id: Date.now(),
      createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      ...formDetails,
    };
    console.log("formDetails", newValue);
    axios
      .post("http://localhost:8001/addUsersData", newValue)
      .then((res) => 
      fetchAddedUsersData(),
    //   console.log("added data response=>>>", res),
    
      notification.open({
        message: "Data Added Successfully",
        icon: (<CheckCircleTwoTone
            twoToneColor="#52c41a" 
          />)
      })
      );
    form.resetFields();
    setDrawerOpen(!drawerOpen);
    // window.location.reload();
  };

  useEffect(() => {
    fetchAddedUsersData();
  }, []);

  const fetchAddedUsersData = () => {
    axios
      .get("http://localhost:8001/addUsersData")
      .then((res) => setTableDatas(res.data));
  };

  const onAddClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  //logout button
  const onHandleClick = () => {
    navigate("/");
    notification.open({
        message: "You are logged out",
        icon: (<CheckCircleTwoTone
            twoToneColor="#52c41a" 
          />)
      })
  };


  //delete from table
  const onTableDelete = (id) => {
    Modal.confirm({
        title: 'Confirm',
        content: 'Are you sure???',
        onOk() {
            axios
      .delete(`http://localhost:8001/addUsersData/${id}`)
      .then((res) => 
    //   console.log(res)
    fetchAddedUsersData(),
      notification.open({
        message: "Data Deleted Successfully",
        icon: (<DeleteOutlined 
            style={{
                color: "#eb2f96"
            }}
          />)
      })
      );
        var newUser = tableDatas.filter((item) => {
        return item.id !== id;
        });
        console.log(newUser);
        },
        cancelText: 'Cancel'
        
      });
    
  };


  //edit table
  const onTableEdit = (id) => {
    console.log("editUser id", id)

    const editUser = tableDatas.find((data) => {
        return data.id === id
    })
      console.log("editUser", editUser)
    form.setFieldsValue({
        first_name: editUser.first_name,
        last_name: editUser.last_name,
        email: editUser.email
    })
    setOnDataEdit(editUser)
    setEditValue(true)
    setDrawerOpen(!drawerOpen)
  }

  const onTableDataEdit = (updatedData, prevData) => {
    const newUpdatedData = {
        createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
        ...updatedData
    }
    console.log("editedid", updatedData)
    try {
    axios.put(`http://localhost:8001/addUsersData/${prevData.id}`, newUpdatedData)
    setDrawerOpen(!drawerOpen);
    form.resetFields();
    fetchAddedUsersData()

    } catch(error) {
        console.log("error", error)
    }

  }

  //cancel
  const onDataCancel = () => {
    form.resetFields();
    setDrawerOpen(!drawerOpen);
  } 

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "flex-start", margin: 30 }}
      >
        <Button type="primary" onClick={onHandleClick}>
          Logout
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: 20 }}>
        <Button type="primary" onClick={onAddClick}>
          Add User
        </Button>
      </div>
      <DrawerComponent
        form={form}
        onDrawerClose={onAddClick}
        onDrawerOpen={drawerOpen}
        onFomDataSubmit={onFormSubmit}
        onTableDataEdit={onTableDataEdit}
        editValue={editValue}
        onDataEdit={onDataEdit}
        onDataCancel={onDataCancel}
      />
      <TableLists onTableEdit={onTableEdit} tableDatas={tableDatas} onTableDelete={onTableDelete} />
    </>
  );
};

export default DetailsPage;
