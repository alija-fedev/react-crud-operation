import "antd/dist/antd.css";
import { Space, Table } from "antd";

const TableLists = ({tableDatas, onTableDelete, onTableEdit}) => {
const onDelete = (data) => {
    onTableDelete(data)
}

const onEdit = (data) => {
    onTableEdit(data)
}


const columns = [
{
    title: "ID",
    dataIndex: "id",
    key: "id",
},
{
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
},
{
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
},
{
    title: "Email",
    dataIndex: "email",
    key: "email",
},
{
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    filters: [
       {
        text: "November",
        value: "November"
       },
       {
        text: "2:56:29 am",
        value: "2:56:29 am"
       },
    ],
    onFilter: (value, record) => record.createdAt.includes(value),
},
{
    title: "Action",
    key: "action",
    render: (_, record) => (
        <Space size="middle">
        <a onClick={() => onEdit(record?.id || 0)}>Edit</a>
        <a onClick={() => onDelete(record.id)}>Delete</a>
        </Space>
    ),
    }
];
  return (
    <>
      <Table 
      columns={columns}
      dataSource={tableDatas}
      ></Table>
    </>
  );
};

export default TableLists;
