import LoginForm from "../../components/LoginForm/LoginForm";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, notification } from "antd";
import { CheckCircleTwoTone, ExclamationOutlined } from '@ant-design/icons';

const HomePage = () => {
    const navigate = useNavigate();
    const [currentForm, setCurrentForm] = useState("login");
    const [regdata, setRegData] = useState([]);
    const [form] = Form.useForm();
    const toggleForm = (formName) => {
        setCurrentForm(formName)
    }

    //registration form
    const onFormSubmit = (formDatas) => {
        console.log(formDatas);

        const newRegistrationValue = {
            id: Date.now(),
            ...formDatas
        };
        axios.post("http://localhost:8000/registrationUsers", newRegistrationValue).then((res) => {
      console.log("responsedata", res);
    });
    form.resetFields();
    notification.open({
        message: "Registration Successfully",
        icon: (<CheckCircleTwoTone
            twoToneColor="#52c41a" 
          />)
      })
    }

    useEffect(() => {
        fetchUsersData();
      }, []);
    
      const fetchUsersData = () => {
        axios
          .get("http://localhost:8000/registrationUsers")
          .then((res) => setRegData(res.data));
      };

    //login form
    const onButtonClick = (datas) => {
            const user = regdata.find((a) => {
                return a.firstname === datas.username && a.lastname === datas.password
            })
            if(user) {
                console.log("matched");
                navigate("/details")
                notification.open({
                    message: "Successfully logged in",
                    icon: (<CheckCircleTwoTone
                        twoToneColor="#52c41a" 
                    />)
                })
                
            } else {
                console.log("unmatched")
                notification.open({
                    message: "Wrong Credentials",
                    icon: (<ExclamationOutlined 
                        twoToneColor="#eb2f96" 
                    />)
                })
            }
            form.resetFields();
    }

    return(
        <>
             {
                currentForm === "login" ? <LoginForm onButtonClick={onButtonClick} onFormSwitch={toggleForm} form={form} /> : <RegistrationForm onFormChange={toggleForm}  form={form}  onFormSwitch={toggleForm} onFormValueSubmit={onFormSubmit} />
            }

            
        </>
    )
}

export default HomePage;