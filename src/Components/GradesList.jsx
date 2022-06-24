import { useContext, useEffect, useState } from "react";
import {
  getAllCourses,
  getAllEnrollments,
  getAllFinalScores,
  getAllGrades,
  getAllSubjects,
} from "../API/ApiClient";
import { Table } from "antd";
import Card from "../Shared/Card";
import "../SCSS/CourseList.scss";
import AppContext from "../Context/AppContext";
import "../SCSS/PaymentList.scss";
import { formatDate } from "../Utils/formatDate";

function PaymentList() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loggedUser } = useContext(AppContext);
  const [selected, setSelected] = useState(null);
  const [finalScores, setFinalScores] = useState([]);
  const [finalScoreForEnrollment, setFinalScoreForEnrollment] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const enrollments = await getAllEnrollments();
      setEnrollments(
        enrollments.filter((item) => item.studentId === loggedUser.id)
      );

      const finalScores = await getAllFinalScores();
      setFinalScores(finalScores);

      setLoading(false);
    };

    getData();
  }, []);

  const handleViewGrades = (enrollment) => {
    const score = finalScores.find(
      (score) => score.enrollmentId == enrollment.id
    );
    setFinalScoreForEnrollment(score);
    setSelected(enrollment);
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
              handleViewGrades(enrollment);
            }}
            style={{ marginRight: "10px" }}
          >
            View grades
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
        <div className="flex-row">
          <div className="course-details flex-column">
            <div className="course-name">View grades</div>
            <div className="details-list">
              {selected.grades.length > 0 ? (
                selected.grades.map((grade) => (
                  <div className="single-detail">
                    <div className="course-detail-element">
                      <span className="detail-title">Subject</span>
                      {grade.subject?.subjectName}
                    </div>
                    <div className="course-detail-element">
                      <span className="detail-title">Grade</span>
                      {grade.gradeValue}
                    </div>
                    <div className="course-detail-element">
                      <span className="detail-title">Percent</span>
                      {grade.percent}%
                    </div>
                    <div className="course-detail-element last">
                      <span className="detail-title">Date</span>
                      {formatDate(grade.date)}
                    </div>
                  </div>
                ))
              ) : (
                <span>No grades yet.</span>
              )}
            </div>
          </div>
          <div className="course-details flex-column">
            <div className="course-name">Final score for enrollment</div>
            <div className="details-list">
              <div className="course-detail-element">
                <span className="detail-title">Average</span>
                {finalScoreForEnrollment ? finalScoreForEnrollment.average : 0}
              </div>
              <div className="course-detail-element">
                <span className="detail-title">Last updated</span>
                {finalScoreForEnrollment
                  ? formatDate(finalScoreForEnrollment.lastUpdatedOn)
                  : "..."}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PaymentList;
