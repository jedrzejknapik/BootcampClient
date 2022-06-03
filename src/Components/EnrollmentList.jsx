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

function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const { loggedUser } = useContext(AppContext);
  const { Option } = Select;
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [reload, setReload] = useState(false);

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
    console.log(selectedCourseId);
    await postEnrollment(selectedCourseId, loggedUser?.id);
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
    // {
    //   title: "Action",
    //   key: "operation",
    //   render: (enrollment) => (
    //     <button
    //       className="btn-sm"
    //       onClick={() => handleViewDetails(enrollment)}
    //     >
    //       View payments
    //     </button>
    //   ),
    //   align: "right",
    // },
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
