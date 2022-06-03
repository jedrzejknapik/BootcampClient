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

function PaymentList() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loggedUser } = useContext(AppContext);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);
  const [gradesForEnrollment, setGradesForEnrollment] = useState([]);
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [finalScores, setFinalScores] = useState([]);
  const [finalScoreForEnrollment, setFinalScoreForEnrollment] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const courses = await getAllCourses();
      setCourses(courses);

      const enrollments = await getAllEnrollments();
      setEnrollments(
        enrollments.filter((item) => item.studentId === loggedUser.id)
      );

      const grades = await getAllGrades();
      setGrades(grades);

      const subjects = await getAllSubjects();
      setSubjects(subjects);

      const finalScores = await getAllFinalScores();
      setFinalScores(finalScores);

      setLoading(false);
    };

    getData();
  }, []);

  const handleViewGrades = (enrollment) => {
    setSelectedEnrollmentId(enrollment.id);

    const gradesForEnrollment = [...grades].filter(
      (g) => g.enrollmentId === enrollment.id
    );

    const finalScoreForEnrollment = [...finalScores].find(
      (f) => f.enrollmentId === enrollment.id
    );
    setFinalScoreForEnrollment(finalScoreForEnrollment);

    setGradesForEnrollment(gradesForEnrollment);
    setCourseId(enrollment.courseId);
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
      {selectedEnrollmentId && (
        <div className="flex-row">
          <div className="course-details flex-column">
            <div className="course-name">View grades</div>
            <div className="details-list">
              {gradesForEnrollment.length > 0 ? (
                gradesForEnrollment.map((grade) => (
                  <div className="single-detail">
                    <div className="course-detail-element">
                      <span className="detail-title">Subject</span>
                      {
                        subjects.find((s) => s.id == grade.subjectId)
                          ?.subjectName
                      }
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
                      {grade.date}
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
                  ? finalScoreForEnrollment.lastUpdatedOn
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
