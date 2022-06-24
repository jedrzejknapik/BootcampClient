import { useContext, useEffect, useState } from "react";
import {
  getAllCourses,
  getAllEnrollments,
  postEnrollment,
} from "../API/ApiClient";
import { Table } from "antd";
import Card from "../Shared/Card";
import "../SCSS/CourseList.scss";
import AppContext from "../Context/AppContext";
import "../SCSS/EnrollmentList.scss";
import { Select } from "antd";
import { formatDate } from "../Utils/formatDate";
import { useToast } from "../hooks/useToast";

function EnrollmentList() {
  const { loggedUser } = useContext(AppContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const { Option } = Select;
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [reload, setReload] = useState(false);
  const { errorToast, successToast } = useToast();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const courses = await getAllCourses();
      setCourses(courses);
      const enrollments = await getAllEnrollments();
      setEnrollments(enrollments);
      setLoading(false);
    };

    getData();
  }, [reload]);

  const handleEnroll = async () => {
    const result = await postEnrollment(selectedCourseId, loggedUser?.id);
    console.log(result.status);
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
  ];

  return (
    <>
      <Card>
        <Table
          columns={columns}
          dataSource={enrollments.filter(
            (item) => item.studentId === loggedUser.id
          )}
          pagination={false}
          loading={loading}
          scroll={{ y: 500 }}
        />
      </Card>
      <div className="course-details">
        <div className="course-name">Create new enrollment</div>
        <div className="select-course-form">
          <Select
            placeholder="Select course"
            style={{ width: 200, marginRight: "20px" }}
            size="large"
            value={selectedCourseId}
            onChange={(value) => setSelectedCourseId(value)}
          >
            {courses.map((c) => (
              <Option value={c.id}>{c.courseName}</Option>
            ))}
          </Select>
          <button className="btn" onClick={handleEnroll}>
            Enroll me
          </button>
        </div>
      </div>
    </>
  );
}

export default EnrollmentList;
