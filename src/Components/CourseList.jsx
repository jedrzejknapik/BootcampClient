import { useEffect, useState } from "react";
import { getAllCourses } from "../API/ApiClient";
import { Table } from "antd";
import { NavLink } from "react-router-dom";
import Card from "../Shared/Card";
import "../SCSS/CourseList.scss";
import { formatDate } from "../Utils/formatDate";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await getAllCourses();
      setCourses(response);
      setLoading(false);
    };

    getData();
  }, []);

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "1",
    },
    {
      title: "Course name",
      dataIndex: "courseName",
      key: "2",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "3",
    },
    {
      title: "Action",
      key: "operation",
      render: (course) => (
        <button className="btn-sm" onClick={() => handleViewDetails(course)}>
          View
        </button>
      ),
      align: "right",
    },
  ];

  return (
    <>
      <Card>
        <Table
          columns={columns}
          dataSource={courses}
          pagination={false}
          loading={loading}
          scroll={{ y: 500 }}
        />
      </Card>
      {selectedCourse && (
        <div className="course-details">
          <div className="course-name">{selectedCourse.courseName}</div>
          <div className="course-detail-element">
            <span className="detail-title">Description</span>
            {selectedCourse.description}
          </div>
          <div className="course-detail-element">
            <span className="detail-title">Price</span>
            {selectedCourse.price} zł
          </div>
          <div className="course-detail-element">
            <span className="detail-title">Level</span>
            {selectedCourse.level}
          </div>
          <div className="course-detail-element">
            <span className="detail-title">Start</span>
            {formatDate(selectedCourse.startDate)}
          </div>
          <div className="course-detail-element">
            <span className="detail-title">End</span>
            {formatDate(selectedCourse.endDate)}
          </div>
        </div>
      )}
    </>
  );
}

export default CourseList;
