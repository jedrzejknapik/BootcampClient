import "../../SCSS/HomePage.scss";
import { Input, Table } from "antd";
import { useState, useEffect } from "react";
import { getStudents, postNewUser } from "../../API/ApiClient";
import { useToast } from "../../hooks/useToast";
import { formatDate } from "../../Utils/formatDate";
import Card from "../../Shared/Card";

function TeacherNewUser() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const { successToast, errorToast } = useToast();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const students = await getStudents();
      setStudents(students);
      setLoading(false);
    };

    getData();
  }, [reload]);

  const inputName = (e) => {
    setName(e.target.value);
  };

  const inputSurname = (e) => {
    setSurname(e.target.value);
  };

  const inputAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleAddUser = async () => {
    if (name.length === 0 || surname.length === 0 || address.length === 0) {
      errorToast();
      return;
    }
    const result = await postNewUser(name, surname, address);
    if (result) {
      successToast();
      setReload((prev) => !prev);
    } else {
      errorToast();
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "0",
    },
    {
      title: "First name",
      dataIndex: "firstName",
      key: "1",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "2",
    },
    {
      title: "Enrolled",
      dataIndex: "",
      key: "3",
      render: (s) => <span>{formatDate(s.enrollmentDate)}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "4",
    },
  ];

  return (
    <div className="page">
      <div className="new-user-form">
        <h1 className="header">Register new student</h1>
        <Input placeholder="First name" value={name} onChange={inputName} />
        <Input
          placeholder="Last name"
          value={surname}
          onChange={inputSurname}
        />
        <Input placeholder="Address" value={address} onChange={inputAddress} />
        <button className="btn" onClick={handleAddUser}>
          Proceed
        </button>
      </div>
      <Card>
        <Table
          columns={columns}
          dataSource={students}
          pagination={false}
          loading={loading}
          scroll={{ y: 450 }}
        />
      </Card>
    </div>
  );
}

export default TeacherNewUser;
