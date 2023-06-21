import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import toastr from "toastr";
import debug from "sabio-debug";
import { Card, Col, Row, Image, ListGroup, Breadcrumb } from "react-bootstrap";
import courseService from "../../services/courseService";
import Ratings from "components/ratings/Ratings";
import * as lectureService from "../../services/lectureService";
import * as DateFormat from "../../utils/dateFormater";
import Icon from "@mdi/react";
import {
  mdiBookOpenPageVariant,
  mdiHumanMaleBoard,
  mdiClockOutline,
  mdiSquareEditOutline,
} from "@mdi/js";
import "./course.css";
import CourseLectureCard from "./CourseLectureCard";
const _logger = debug.extend("CourseDetail");

const CourseInfo = ({ currentUser }) => {
  const [courseDetail, setCourseDetail] = useState({
    id: 0,
    title: "",
    subject: "",
    description: "",
    instructor: "",
    lectureType: [],
    coverImageUrl: "",
    statusName: "",
    createdBy: 0,
    dateCreated: "",
    modifiedBy: 0,
    dateModified: "",
  });
  const [pageData, setPageData] = useState({
    lecturesArray: [],
    lectureComponents: [],
  });
  const { state } = useLocation();
  useEffect(() => {
    if (state !== null) {
      setCourseDetail({
        id: state.id,
        title: state.title,
        subject: state.subject,
        description: state.description,
        duration: state.duration,
        instructorId: state.instructor.id,
        instructorFirstName: state.instructor.firstName,
        instructorLastName: state.instructor.lastName,
        instructorAvatarUrl: state.instructor.avatarUrl,
        lectureTypeId: state.lectureType.id,
        lectureTypeName: state.lectureType.name,
        coverImageUrl: state.coverImageUrl,
        statusId: state.statusName.id,
        statusName: state.statusName.name,
        createdBy: state.createdBy,
        dateCreated: state.dateCreated,
        modifiedBy: state.modifiedBy,
        dateModified: state.dateModified,
      });
    } else {
      courseService
        .getCourseById(courseDetail.id)
        .then(onGetCourseIdSuccess)
        .catch(onGetCourseIdError);
    }
    lectureService
      .getLecturesByCourseId(state.id)
      .then(onGetLectureSuccess)
      .catch(onGetLectureError);
  }, []);
  const mapLectureCards = (singleLecture) => {
    _logger(singleLecture);
    return (
      <CourseLectureCard
        oneLecture={singleLecture}
        key={"ListA-" + singleLecture.id}
      />
    );
  };
  const onGetLectureSuccess = (response) => {
    _logger("lecture data for cards", response.items);
    let ajaxLectures = response.items;
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.lecturesArray = ajaxLectures;
      pd.lectureComponents = ajaxLectures.map(mapLectureCards);
      return pd;
    });
  };
  const onGetLectureError = (err) => {
    _logger(err);
  };
  const onGetCourseIdSuccess = (response) => {
    const courseDetailFromAjax = response.item;
    setCourseDetail({
      id: courseDetailFromAjax.id,
      title: courseDetailFromAjax.title,
      subject: courseDetailFromAjax.subject,
      description: courseDetailFromAjax.description,
      duration: courseDetailFromAjax.duration,
      instructorId: courseDetailFromAjax.instructorId,
      instructorFirstName: courseDetailFromAjax.instructorFirstName,
      instructorLastName: courseDetailFromAjax.instructorLastName,
      instructorAvatarUrl: courseDetailFromAjax.instructorAvatarUrl,
      lectureTypeId: courseDetailFromAjax.lectureType.id,
      lectureTypeName: courseDetailFromAjax.lectureType.name,
      statusId: courseDetailFromAjax.statusName.id,
      statusName: courseDetailFromAjax.statusName.name,
      createdBy: courseDetailFromAjax.createdBy,
      dateCreated: courseDetailFromAjax.dateCreated,
      modifiedBy: courseDetailFromAjax.modifiedBy,
      dateModified: courseDetailFromAjax.dateModified,
    });
  };
  const onGetCourseIdError = (err) => {
    _logger(err);
    toastr.error("Course not found. Please check the course requested.");
  };
  const navigate = useNavigate();
  const onLocalClickEditDelete = (e) => {
    e.preventDefault();
    navigate(`/course/${courseDetail.id}/edit`, {
      state: courseDetail,
    });
  };
  _logger(currentUser.roles.length);
  return (
    <Fragment>
      <Row className="mx-2 my-2">
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom mb-2 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Course Details</h1>
              <Breadcrumb>
                <Breadcrumb.Item
                  href={
                    currentUser.roles.length < 1
                      ? "/coursesoffered"
                      : "/courses"
                  }
                >
                  Courses Offered
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Current Course</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </Col>
      </Row>
      <Card className="mt-2 mb-4 card-hover courseCardDetailBody mx-12">
        <Row className="g-0">
          <span className="courseDetailBodyBadge">{courseDetail.subject}</span>

          <img
            src={courseDetail.coverImageUrl}
            alt="..."
            className="bg-cover img-left-rounded col-lg-6 col-md-12 col-sm-12 courseDetailCourseImage"
          />
          <Col lg={6} md={12} sm={12}>
            <Card.Body className="courseCardDetail">
              <h3 className="mb-2 text-truncate-line-2 ">
                {courseDetail.title}
              </h3>
              <ListGroup as="ul" bsPrefix="list-inline" className="mb-2">
                <ListGroup.Item
                  as="li"
                  bsPrefix="list-inline-item"
                  className="mb-2"
                >
                  <Icon path={mdiBookOpenPageVariant} size={1} />{" "}
                  {courseDetail.description}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup as="ul" bsPrefix="list-inline" className="">
                <ListGroup.Item
                  as="li"
                  bsPrefix="list-inline-item"
                  className="mb-2"
                >
                  <Icon path={mdiHumanMaleBoard} size={1} />{" "}
                  {courseDetail.lectureTypeName}
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix="list-inline-item">
                  <Icon path={mdiClockOutline} size={1} />{" "}
                  {courseDetail.duration}
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix="list-item" className="h4">
                  Added by: {courseDetail.createdBy.firstName}{" "}
                  {courseDetail.createdBy.lastName} on{" "}
                  {DateFormat.formatDate(courseDetail.dateCreated)}
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix="list-item" className="h4">
                  Status: {courseDetail.statusName}
                </ListGroup.Item>
              </ListGroup>
              <Row className="align-items-center g-0">
                <Col className="col-auto">
                  <Image
                    src={courseDetail.instructorAvatarUrl}
                    className="rounded-circle avatar"
                    sizes="72px"
                    alt=""
                  />
                </Col>
                <Col className="col ms-2">
                  <span className="h4">
                    {courseDetail.instructorFirstName}{" "}
                    {courseDetail.instructorLastName}
                  </span>
                </Col>
                <Col>
                  <Icon
                    path={mdiSquareEditOutline}
                    size={2}
                    onClick={onLocalClickEditDelete}
                    cursor="pointer"
                    title="Edit a Course"
                    className={
                      currentUser.roles.includes("Admin")
                        ? "courseEditIcon"
                        : "d-none"
                    }
                  />
                </Col>
              </Row>
              <div className="ratings-container">
                <Ratings
                  entityId={state.id}
                  entityTypeId={state.lectureType.id}
                />
                <p>Click to Submit Rating</p>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <Row className="bg-primary mb-3">
        <div className="col-5"></div>

        <div className="mx-4 h2 text-white">Lectures for each course:</div>
        <div className="col-5"></div>
      </Row>
      <div className="container courseLectureCards">
        <Row className="bg-primary mb-2 courseLectureCardRow">
          {pageData.lectureComponents}
        </Row>
      </div>
    </Fragment>
  );
};
CourseInfo.propTypes = {
  currentUser: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
export default CourseInfo;
