import { useContext, useEffect, useState } from "react";
import {
  getAllCourses,
  getAllEnrollments,
  getAllPayments,
  postPayment,
} from "../API/ApiClient";
import { Table } from "antd";
import Card from "../Shared/Card";
import "../SCSS/CourseList.scss";
import AppContext from "../Context/AppContext";
import "../SCSS/PaymentList.scss";
import { Select, InputNumber } from "antd";

function PaymentList() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [payments, setPaymants] = useState([]);

  const [loading, setLoading] = useState(false);

  const { loggedUser } = useContext(AppContext);
  const { Option } = Select;
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);
  const [reload, setReload] = useState(false);
  const [paymentsForEnrollment, setPaymentsForEnrollment] = useState([]);
  const [amount, setAmount] = useState(0);
  const [amountTotal, setAmountTotal] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const courses = await getAllCourses();
      setCourses(courses);

      const enrollments = await getAllEnrollments();
      setEnrollments(
        enrollments.filter((item) => item.studentId === loggedUser.id)
      );

      const payments = await getAllPayments();
      setPaymants(payments);
      setLoading(false);
    };

    getData();
  }, [reload]);

  const handleViewPayments = (enrollment) => {
    setSelectedEnrollmentId(enrollment.id);
    const forEnrollment = [...payments].filter(
      (p) => p.enrollmentId == enrollment.id
    );
    setPaymentsForEnrollment(forEnrollment);

    let amountPaid = 0;

    for (const payment of forEnrollment) {
      amountPaid += payment.amount;
    }

    let amountTotal = 0;

    setAmountPaid(amountPaid);

    amountTotal = courses.find(
      (course) => course.id === enrollment.courseId
    )?.price;

    setAmountTotal(amountTotal);
  };

  const handlePay = async () => {
    await postPayment(selectedEnrollmentId, amount);
    setReload(!reload);
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
      render: (enrollment) => (
        <span>
          {
            courses.find((course) => course.id === enrollment.courseId)
              ?.courseName
          }
        </span>
      ),
    },
    {
      title: "Student",
      dataIndex: "",
      key: "3",
      render: () => (
        <span>
          {loggedUser?.firstName} {loggedUser?.lastName}
        </span>
      ),
    },
    {
      title: "Date of enrollment",
      dataIndex: "createdOn",
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
      {selectedEnrollmentId && (
        <div className="flex-row">
          <div className="course-details flex-column">
            <div className="course-name">
              View payments for enrollment {selectedEnrollmentId}
              <span className="amount">
                {amountPaid}/{amountTotal} PLN
              </span>
            </div>
            <div className="details-list">
              {paymentsForEnrollment.length > 0 ? (
                paymentsForEnrollment.map((payment) => (
                  <div className="single-detail">
                    <div className="course-detail-element">
                      <span className="detail-title">Payment no.</span>
                      {payment.id}
                    </div>
                    <div className="course-detail-element">
                      <span className="detail-title">Date of payment</span>
                      {payment.dateOfPayment}
                    </div>
                    <div className="course-detail-element">
                      <span className="detail-title">Amount</span>
                      {payment.amount} PLN
                    </div>
                    <div className="course-detail-element last">
                      <span className="detail-title">Installment no.</span>
                      {payment.rate}
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
                value={selectedEnrollmentId}
                onChange={(id) => setSelectedEnrollmentId(id)}
                disabled={true}
              >
                {enrollments.map((e) => (
                  <Option value={e.id}>{e.id}</Option>
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
              <button className="btn" onClick={handlePay}>
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
