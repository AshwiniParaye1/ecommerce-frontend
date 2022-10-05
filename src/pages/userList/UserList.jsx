import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function UserList() {
  // const [data, setData] = useState(userRows);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/");
        let data = res.data;
        let rowData = [];
        if (data.length) {
          for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj.id = data[i]._id;
            obj.email = data[i].email;
            obj.username = data[i].username;
            obj.number = data[i].number;
            rowData.push(obj);
          }
        }
        setUsers(rowData);
      } catch (err) {
        console.log("Oops Something Wen Wrong");
      }
    };
    getUsers();
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "User",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "number", headerName: "Phone", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
