import { useContext, useState, useEffect } from "react";
import {
  getAllEnrollments,
  getGradesSpecify,
  getSubjectsForCourse,
  getSubjectsForLecturer,
  postGrade,
  deleteGrade,
} from "../../API/ApiClient";
import AppContext from "../../Context/AppContext";
import { Select, Table } from "antd";
import Card from "../../Shared/Card";
import "../../SCSS/HomePage.scss";
import { useToast } from "../../hooks/useToast";
import { formatDate } from "../../Utils/formatDate";
import { InputNumber, Space } from "antd";

function TeacherGrades() {
  const { loggedUser } = useContext(AppContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingGrades, setLoadingGrades] = useState(false);
  const [reload, setReload] = useState(false);
  const { errorToast, successToast } = useToast();
  const [mySubjects, setMySubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [grades, setGrades] = useState([]);

  const [gradeVal, setGradeVal] = useState(2);
  const [gradePerc, setGradePerc] = useState(0);
  const [showAdd, setShowAdd] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const enrollments = await getAllEnrollments();
      const mySubjects = await getSubjectsForLecturer(loggedUser?.id);
      setMySubjects(mySubjects);
      setEnrollments(enrollments);

      setSelectedEnrollment((prev) => {
        if (prev != null) {
          return prev;
        } else {
          return null;
        }
      });

      setSelectedSubject((prev) => {
        if (prev != null) {
          return prev;
        } else {
          return null;
        }
      });

      setLoading(false);
    };

    getData();
  }, [reload]);

  const handleViewSubjects = async (enrollment) => {
    setLoadingSubjects(true);
    setSelectedEnrollment(enrollment);
    const subjects = await getSubjectsForCourse(enrollment.course.id);
    setSubjects(subjects);
    setSelectedSubject(null);
    setLoadingSubjects(false);
  };

  const handleViewGrades = async (sub, enrId) => {
    setLoadingGrades(true);
    setSelectedSubject(sub);
    const grades = await getGradesSpecify(enrId, sub?.id);
    setGrades(grades);
    setLoadingGrades(false);
  };

  const handleShowAddGrade = (sub) => {
    setSelectedSubject(sub);
    setShowAdd(true);
  };

  const handleAddGrade = async () => {
    const result = await postGrade(
      selectedEnrollment?.id,
      selectedSubject?.id,
      gradeVal,
      gradePerc
    );
    console.log(result);
    if (result) {
      successToast();
      handleViewGrades(selectedSubject, selectedEnrollment?.id);
      setReload((prev) => !prev);
    } else {
      errorToast();
    }
  };

  const handleDeleteGrade = async (id) => {
    const result = await deleteGrade(id);
    if (result) {
      successToast();
      handleViewGrades(selectedSubject, selectedEnrollment?.id);
      setReload((prev) => !prev);
    } else {
      errorToast();
    }
  };

  const columns = [
    {
      title: "Enrollment",
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
              handleViewSubjects(enrollment);
            }}
            style={{ marginRight: "10px" }}
          >
            View subjects
          </button>
        </>
      ),
      align: "center",
    },
  ];

  const subjectsColumns = [
    {
      title: "Subject name",
      dataIndex: "subjectName",
      key: "2",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "3",
    },
    {
      title: "Field",
      dataIndex: "field",
      key: "4",
    },
    {
      title: "Action",
      key: "operation",
      render: (subject) => {
        const isDisabled = !mySubjects.find((x) => x.id === subject.id);
        return (
          <>
            <button
              disabled={isDisabled}
              className="btn-sm"
              onClick={() => {
                handleViewGrades(subject, selectedEnrollment.id);
              }}
              style={{ marginRight: "10px" }}
            >
              View grades for {selectedEnrollment?.student?.firstName}{" "}
              {selectedEnrollment?.student?.lastName}
            </button>
            <button
              disabled={isDisabled}
              className="btn-sm btn-add"
              onClick={() => handleShowAddGrade(subject)}
              style={{ marginRight: "10px" }}
            >
              Add grade
            </button>
          </>
        );
      },
      align: "center",
    },
  ];

  const gradesColumns = [
    {
      title: "Subject name",
      dataIndex: "",
      key: "1",
      render: () => <span>{selectedSubject?.subjectName}</span>,
    },
    {
      title: "Grade",
      dataIndex: "gradeValue",
      key: "2",
    },
    {
      title: "Percentage",
      dataIndex: "percent",
      key: "3",
    },
    {
      title: "Date",
      dataIndex: "",
      key: "4",
      render: (grade) => <span>{formatDate(grade.date)}</span>,
    },
    {
      title: "Action",
      key: "operation",
      render: (grade) => {
        return (
          <button
            className="btn-sm btn-delete"
            onClick={() => handleDeleteGrade(grade?.id)}
          >
            Delete
          </button>
        );
      },
      align: "center",
    },
  ];

  return (
    <div className="page">
      <Card>
        <Table
          columns={columns}
          dataSource={enrollments}
          pagination={false}
          loading={loading}
          scroll={{ y: 300 }}
        />
      </Card>
      <div className="course-details">
        {selectedEnrollment && (
          <>
            <div className="course-name">Subjects</div>
            <Card>
              <Table
                columns={subjectsColumns}
                dataSource={subjects}
                pagination={false}
                loading={loadingSubjects}
                scroll={{ y: 350 }}
              />
            </Card>
          </>
        )}
      </div>
      <div className="course-details">
        {selectedSubject && (
          <>
            <div className="course-name">Grades</div>
            <Card>
              <Table
                columns={gradesColumns}
                dataSource={grades}
                pagination={false}
                loading={loadingGrades}
                scroll={{ y: 350 }}
              />
            </Card>
          </>
        )}
        <div className="course-details">
          {selectedSubject && showAdd && (
            <>
              <div className="course-name">
                Add Grade for: {selectedEnrollment?.student?.firstName}{" "}
                {selectedEnrollment?.student?.lastName}, subject:{" "}
                {selectedSubject?.subjectName}
              </div>
              <div className="add-grade-form">
                <Space>
                  <div>Grade value:</div>
                  <InputNumber
                    size="large"
                    min={2}
                    max={5}
                    value={gradeVal}
                    onChange={(val) => setGradeVal(val)}
                  />
                  <div>Grade percent:</div>
                  <InputNumber
                    size="large"
                    min={0}
                    max={100}
                    value={gradePerc}
                    onChange={(val) => setGradePerc(val)}
                  />
                  <button className="btn" onClick={handleAddGrade}>
                    Add
                  </button>
                </Space>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherGrades;
