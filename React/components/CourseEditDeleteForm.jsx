import React, { useState, useEffect } from "react";
import "./course.css";
import { Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CourseEditDeleteSchema from "schemas/courseEditDeleteSchema";
import courseService from "../../services/courseService";
import lookUpService from "services/lookUpService";
import UploadFile from "../files/UploadFile";
import toastr from "toastr";
import courseImageDefault from "../../assets/images/placeholder/MoneFiLogoDefault.png";
import avatarDefault from "../../assets/images/avatar/defaultavatar.jpg";
import debug from "sabio-debug";
import { Image, Card, Col, Row, Breadcrumb } from "react-bootstrap";
import Icon from "@mdi/react";
import {
  mdiInformationOutline,
  mdiClockOutline,
  mdiHumanMaleBoard,
  mdiBookOpenPageVariant,
} from "@mdi/js";
const _logger = debug.extend("CourseEditDeleteForm");

function CourseEditDelete() {
  const [editDeleteCourseData, setEditData] = useState({
    title: "",
    subject: "",
    description: "",
    duration: "",
    lectureTypeId: [],
    coverImageUrl: "",
    statusId: [],
    dateCreated: "",
    dateModified: "",
  });
  const [dropdownLectures, setDropdownLectures] = useState({
    lectureTypes: [],
    lectureTypesMapped: [],
    dropdownItems: [],
  });
  const mapLectureTypes = (singleLectureType) => {
    return (
      <option
        value={singleLectureType.id}
        key={"ListD-" + singleLectureType.id}
      >
        {singleLectureType.name}
      </option>
    );
  };
  const [dropdownStatuses, setDropdownStatuses] = useState({
    statusTypes: [],
    statusTypesMapped: [],
    dropdownStatusList: [],
  });
  const mapStatuses = (singleStatus) => {
    return (
      <option value={singleStatus.id} key={"ListC-" + singleStatus.id}>
        {singleStatus.name}
      </option>
    );
  };
  useEffect(() => {
    lookUpService
      .getTypes(["StatusTypes", "LectureTypes"])
      .then(onGetTypeSuccess)
      .catch(onGetTypeError);
  }, []);
  const onGetTypeSuccess = (response) => {
    let newLectures = response.item.lectureTypes;
    setDropdownLectures((prevState) => {
      const dropdownLectures = { ...prevState };
      dropdownLectures.lectureTypes = newLectures;
      dropdownLectures.dropdownLectureList = newLectures.map(mapLectureTypes);
      return dropdownLectures;
    });
    let newStatusTypes = response.item.statusTypes;
    setDropdownStatuses((prevState) => {
      const dropdownStatuses = { ...prevState };
      dropdownStatuses.statusTypes = newStatusTypes;
      dropdownStatuses.dropdownStatusList = newStatusTypes.map(mapStatuses);
      return dropdownStatuses;
    });
  };
  const onGetTypeError = (err) => {
    _logger(err);
  };
  const navigate = useNavigate();
  _logger(navigate);
  const { courseId } = useParams();
  const { state } = useLocation();
  useEffect(() => {
    if (courseId && state) {
      setEditData((prevState) => {
        const newState = { ...prevState };
        newState.coverImageUrl = state.coverImageUrl;
        newState.title = state.title;
        newState.lectureTypeId = state.lectureTypeId;
        newState.lectureTypeName = state.lectureTypeName;
        newState.statusId = state.statusId;
        newState.statusName = state.statusName;
        newState.subject = state.subject;
        newState.description = state.description;
        newState.duration = state.duration;
        return newState;
      });
    } else if ((courseId && state) === null) {
      courseService
        .getCourseById(state.id)
        .then(onGetCourseByIdSuccess)
        .catch(onGetCourseByIdError);
    }
  }, []);
  const onGetCourseByIdSuccess = (response) => {
    const editDataFromAjax = response.item;
    setEditData({
      coverImageUrl: editDataFromAjax.coverImageUrl,
      title: editDataFromAjax.title,
      lectureTypeId: editDataFromAjax.lectureTypeId,
      lectureTypeName: editDataFromAjax.lectureTypeName,
      statusId: editDataFromAjax.statusId,
      statusName: editDataFromAjax.statusName,
      subject: editDataFromAjax.subject,
      description: editDataFromAjax.description,
      duration: editDataFromAjax.duration,
    });
  };
  const onGetCourseByIdError = (err) => {
    _logger(err);
    toastr.error("Course not found. Please check the course requested.");
  };

  const handleSubmit = (values) => {
    courseService
      .editCourse(courseId, values)
      .then(onEditSuccess)
      .catch(onEditError);
  };
  const onEditSuccess = (response) => {
    _logger(response);
    toastr.success("Course update was successful!");
  };
  const onEditError = (err) => {
    _logger(err);
    toastr.error("Course update failed. Please try again.");
  };
  const [courseImagePreview, setCourseImagePreview] = useState({
    courseCardImagePreview: "",
  });
  function onFormChange(e) {
    const { name, value } = e.target;
    setCourseImagePreview((prevState) => {
      let newImage = { ...prevState };
      newImage[name] = value;
      return newImage;
    });
  }
  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom mb-2 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Edit a Course</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="/courses">
                  Courses Offered
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Edit a Course</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </Col>
      </Row>
      <div className="row">
        <div className="col-8">
          <Formik
            enableReinitialize={true}
            initialValues={editDeleteCourseData}
            onSubmit={handleSubmit}
            validationSchema={CourseEditDeleteSchema}
          >
            {({ setFieldValue }) => (
              <Card className="mb-3">
                <Card.Header className="border-bottom px-4 py-3">
                  <h4 className="mb-0">Course Information</h4>
                </Card.Header>
                <Card.Body>
                  <Form>
                    Course Image:
                    <Field
                      type="input"
                      name="coverImageUrl"
                      className="form-control mb-1"
                      placeholder="Please add a course image"
                      values={editDeleteCourseData.coverImageUrl}
                    />
                    <ErrorMessage
                      name="coverImageUrl"
                      component="div"
                      className="has-error courseEditFormikErrors"
                    />
                    <p>Drag and drop or upload an image. </p>
                    <div className="pt-4 w-50 mx-18">
                      <UploadFile
                        getResponseFile={(arr) => {
                          setFieldValue("coverImageUrl", arr[0].url);
                        }}
                      />
                    </div>
                    <span>Course Title:</span>
                    <Field
                      type="text"
                      name="title"
                      className="form-control mb-1"
                      placeholder="Please add a course title"
                      values={editDeleteCourseData.title}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="has-error courseEditFormikErrors"
                    />
                    <span>Course Subject:</span>
                    <Field
                      type="text"
                      name="subject"
                      className="form-control mb-1"
                      placeholder="Please add a course subject"
                      values={editDeleteCourseData.subject}
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="has-error courseEditFormikErrors"
                    />
                    <span>Course Description:</span>
                    <Field
                      type="text"
                      name="description"
                      className="form-control mb-2"
                      placeholder="Please add a course description"
                      values={editDeleteCourseData.description}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="has-error courseEditFormikErrors"
                    />
                    <span>Course Duration: Ex: 1h 30m</span>
                    <Field
                      type="text"
                      name="duration"
                      className="form-control mb-2"
                      placeholder="Please add a duration"
                      values={editDeleteCourseData.duration}
                    />
                    <ErrorMessage
                      name="duration"
                      component="div"
                      className="has-error courseEditFormikErrors"
                    />
                    Lecture Type:
                    <Field
                      type="number"
                      as="select"
                      name="lectureTypeId"
                      className="form-control mb-2"
                    >
                      {dropdownLectures.dropdownLectureList}
                    </Field>
                    Status:
                    <Field
                      type="number"
                      as="select"
                      name="statusId"
                      className="form-control mb-2"
                    >
                      {dropdownStatuses.dropdownStatusList}
                    </Field>
                    <Row>
                      <button
                        type="submit"
                        className="btn btn-primary rounded my-1 courseEditSubmitButton"
                      >
                        Submit
                      </button>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </Formik>
        </div>

        <div className="col-4">
          <span>Paste your image here for a preview!</span>
          <input
            type="text"
            className="form-control"
            name="courseCardImagePreview"
            value={courseImagePreview.courseCardImagePreview}
            onChange={onFormChange}
          ></input>
          <div>
            <Card className="my-2 mb-4 card-hover mx-1 cardListText">
              <div className="bg-image">
                <span className="notify-badge courseSubjectBadge">
                  Course Subject Here
                </span>
                <img
                  src={courseImagePreview.courseCardImagePreview}
                  className="card-img-top rounded-top-md cardCourseImage"
                  alt=""
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = courseImageDefault;
                  }}
                />
              </div>
              <Card.Body className="p-3">
                <Card.Text className="h3 text-inherit">Course Title</Card.Text>
                <Card.Text className="text-inherit">
                  <Icon path={mdiBookOpenPageVariant} size={1} /> Course
                  Description
                </Card.Text>
                <Card.Text className="text-inherit">
                  <Icon path={mdiHumanMaleBoard} size={1} /> Lecture Type Here
                </Card.Text>
                <Card.Text className="text-inherit">
                  <Icon path={mdiClockOutline} size={1} /> 1h 30m
                </Card.Text>
              </Card.Body>
              <Card.Footer className="py-2">
                <Row className="align-items-center g-0">
                  <Col className="col-auto">
                    <Image
                      src={avatarDefault}
                      className="rounded-circle avatar"
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = avatarDefault;
                      }}
                    />
                  </Col>
                  <Col className="col ms-2">
                    <span className="text-inherit">Instructor Name</span>
                  </Col>
                  <Col className="col-auto">
                    <Icon
                      className="courseInfoButton"
                      path={mdiInformationOutline}
                      size={1.4}
                    ></Icon>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
CourseEditDelete.propType = {
  currentUser: PropTypes.shape({
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      avatarUrl: PropTypes.string,
      email: PropTypes.string.isRequired,
      isLoggedIn: PropTypes.bool.isRequired,
      roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }).isRequired,
};
export default CourseEditDelete;
