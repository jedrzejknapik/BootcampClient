import axios from "axios";
import moment from "moment";

const apiUrl = "https://localhost:7039/api/";

export const getAllCourses = () => {
  try {
    return axios.get(apiUrl + "Course").then((res) => res.data);
  } catch (err) {
    return [];
  }
};

export const getStudentById = (id) => {
  try {
    return axios
      .get(apiUrl + `Student/${id}`)
      .then((res) => res.data)
      .catch((err) => false);
  } catch (err) {
    return false;
  }
};

export const getStudents = () => {
  try {
    return axios
      .get(apiUrl + "Student")
      .then((res) => res.data)
      .catch((err) => false);
  } catch (err) {
    return false;
  }
};

export const getLecturerById = (id) => {
  try {
    return axios
      .get(apiUrl + `Lecturer/${id}`)
      .then((res) => res.data)
      .catch((err) => false);
  } catch (err) {
    return false;
  }
};

export const getGradesSpecify = (enrollmentId, subjectId) => {
  try {
    return axios
      .get(
        apiUrl +
          `Grade/query?subjectId=${subjectId}&enrollmentId=${enrollmentId}`
      )
      .then((res) => res.data)
      .catch((err) => false);
  } catch (err) {
    return false;
  }
};

export const getAllEnrollments = () => {
  try {
    return axios.get(apiUrl + "Enrollment").then((res) => res.data);
  } catch (err) {
    return false;
  }
};

export const getAllFinalScores = () => {
  try {
    return axios.get(apiUrl + "FinalScore").then((res) => res.data);
  } catch (err) {
    return false;
  }
};

export const getAllGrades = () => {
  try {
    return axios.get(apiUrl + "Grade").then((res) => res.data);
  } catch (err) {
    return false;
  }
};

export const getAllLecturers = () => {
  try {
    return axios.get(apiUrl + "Lecturer").then((res) => res.data);
  } catch (err) {
    return false;
  }
};

export const getAllPayments = () => {
  try {
    return axios.get(apiUrl + "Payment").then((res) => res.data);
  } catch (err) {
    return false;
  }
};

export const getAllSubjects = () => {
  try {
    return axios.get(apiUrl + "Subject").then((res) => res.data);
  } catch (err) {
    return false;
  }
};

export const getSubjectsForLecturer = (lecturerId) => {
  try {
    return axios
      .get(apiUrl + `Lecturer/subjects/${lecturerId}`)
      .then((res) => res.data)
      .catch((err) => false);
  } catch (err) {
    return false;
  }
};

export const getSubjectsForCourse = (courseId) => {
  try {
    return axios
      .get(apiUrl + `Lecturer/subjects/course/${courseId}`)
      .then((res) => res.data)
      .catch((err) => false);
  } catch (err) {
    return false;
  }
};

//POST
export const postEnrollment = (courseId, studentId) => {
  try {
    return axios
      .post(apiUrl + "Enrollment", {
        courseId,
        studentId,
        createdOn: moment(new Date()),
      })
      .then((res) => res.status === 200)
      .catch((err) => false);
  } catch (err) {
    return false;
  }
};

export const postPayment = (enrollmentId, amount) => {
  try {
    return axios
      .post(apiUrl + "Payment", {
        enrollmentId,
        dateOfPayment: moment(new Date()),
        amount,
        rate: "1",
      })
      .then((res) => res.status === 200)
      .catch((err) => false);
  } catch (err) {
    return false;
  }
};

export const postGrade = (enrollmentId, subjectId, value, percent) => {
  try {
    return axios
      .post(apiUrl + "Grade", {
        enrollmentId,
        subjectId: subjectId,
        gradeValue: value,
        percent: percent.toString(),
        date: moment(new Date()),
      })
      .then((res) => res.status === 200)
      .catch((err) => false);
  } catch (err) {
    return false;
  }
};

export const postNewUser = (firstName, lastName, address) => {
  try {
    return axios
      .post(apiUrl + "Student", {
        firstName,
        lastName,
        address,
        enrollmentDate: moment(new Date()),
      })
      .then((res) => res.status === 200)
      .catch((err) => false);
  } catch (err) {
    return false;
  }
};

//DELETE
export const deleteGrade = (id) => {
  try {
    return axios.delete(apiUrl + `Grade/${id}`).then((res) => res.data);
  } catch (err) {
    return false;
  }
};
