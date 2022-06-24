import { useContext, useEffect, useState } from "react";
import { getAllEnrollments, postPayment } from "../API/ApiClient";
import { Table } from "antd";
import Card from "../Shared/Card";
import "../SCSS/CourseList.scss";
import AppContext from "../Context/AppContext";
import "../SCSS/PaymentList.scss";
import { Select, InputNumber } from "antd";
import { formatDate } from "../Utils/formatDate";
import { useToast } from "../hooks/useToast";

function PaymentList() {
  const [enrollments, setEnrollments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loggedUser } = useContext(AppContext);
  const { Option } = Select;
  const [reload, setReload] = useState(false);
  const { successToast, errorToast } = useToast();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const enrollments = await getAllEnrollments();
      setEnrollments(
        enrollments.filter((item) => item.studentId === loggedUser.id)
      );
      setSelected((prev) => {
        if (prev != null) {
          return enrollments.find((e) => e.id == prev.id);
        } else {
          return null;
        }
      });
      setLoading(false);
    };

    getData();
  }, [reload]);

  const handleViewPayments = (enrollment) => {
    setSelected(enrollment);
  };

  const handlePay = async (enrollment) => {
    const result = await postPayment(enrollment?.id, amount);
    console.log(result);
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
      key: "1",
    },
    {
      title: "Course name",
      dataIndex: "",
      key: "2",
      render: (enrollment) => <span>{enrollment?.course?.courseName}</span>,
    },
    {
      title: "Student",
      dataIndex: "",
      key: "3",
      render: (enrollment) => (
        <span>
          {enrollment?.student?.firstName} {enrollment?.student?.lastName}
        </span>
      ),
    },
    {
      title: "Date of enrollment",
      render: (enrollment) => <span>{formatDate(enrollment?.createdOn)}</span>,
    },
    {
      title: "Action",
      key: "operation",
      render: (enrollment) => (
        <>
          <button
            className="btn-sm"
            onClick={() => {
              handleViewPayments(enrollment);
            }}
            style={{ marginRight: "10px" }}
          >
            Manage payments
          </button>
        </>
      ),
      align: "right",
    },
  ];

  return (
    <>
      <Card>
        <Table
          columns={columns}
          dataSource={enrollments}
          pagination={false}
          loading={loading}
          scroll={{ y: 500 }}
        />
      </Card>
      {selected && (
        <div className="flex-wrapper">
          <div className="course-details flex-column">
            <div className="course-name">
              Enrollment {selected.id}
              <span className="amount">
                {selected.payments
                  .map((p) => p.amount)
                  .reduce((partialSum, a) => partialSum + a, 0)}
                /{selected.course.price} PLN
              </span>
            </div>
            <div className="details-list">
              {selected.payments.length > 0 ? (
                selected.payments.map((payment, index) => (
                  <div key={index} className="single-detail">
                    <div className="course-detail-element">
                      <span className="detail-title">Payment no.</span>
                      {payment.id}
                    </div>
                    <div className="course-detail-element">
                      <span className="detail-title">Date of payment</span>
                      {formatDate(payment.dateOfPayment)}
                    </div>
                    <div className="course-detail-element">
                      <span className="detail-title">Amount</span>
                      {payment.amount} PLN
                    </div>
                  </div>
                ))
              ) : (
                <span>No payments yet.</span>
              )}
            </div>
          </div>
          <div className="course-details flex-column">
            <div className="course-name">New payment</div>
            <div className="select-form">
              <Select
                placeholder="Select enrollment"
                style={{ width: 200, marginRight: "20px", height: "42px" }}
                size="large"
                value={selected.id}
                onChange={(enrollment) => setSelected(enrollment)}
                disabled={true}
              >
                {enrollments.map((e, index) => (
                  <Option key={index} value={e.id}>
                    {e.course.courseName}
                  </Option>
                ))}
              </Select>
              <InputNumber
                prefix={"PLN"}
                style={{
                  width: "200px",
                  marginRight: "20px",
                }}
                size="large"
                value={amount}
                onChange={(val) => setAmount(val)}
              />
              <button className="btn" onClick={() => handlePay(selected)}>
                Make payment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PaymentList;
