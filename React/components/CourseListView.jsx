import React, { useState, useEffect, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./course.css";
import debug from "monefi-debug";
import CourseCard from "../courses/CourseCard";
import courseService from "../../services/courseService";
import lookUpService from "services/lookUpService";
import { Row, Col, Form } from "react-bootstrap";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Icon from "@mdi/react";
import { mdiFilterRemoveOutline, mdiPlusBox } from "@mdi/js";
import toastr from "toastr";
import locale from "rc-pagination/lib/locale/en_US";

const _logger = debug.extend("CourseListView");
const CourseListView = ({ currentUser }) => {
  const [pageData, setPageData] = useState({
    courses: [],
    coursesMapped: [],
    courseSubjects: [],
    pageIndex: 0,
    pageSize: 8,
    totalCount: 0,
    query: "",
    selectedFilter: "0",
    selectedSubject: "",
  });
  const onCardEditClicked = useCallback((id) => {
    _logger.log(id);
  });

  const mapCourse = (singleCourse) => {
    return (
      <CourseCard
        theCurrentUser={currentUser}
        oneCourse={singleCourse}
        onCardEditClicked={onCardEditClicked}
      />
    );
  };
  const [dropdownSubjects, setDropdownSubjects] = useState({
    subjects: [],
    subjectsMapped: [],
    dropdownSubjectList: [],
  });
  const mapSubjects = (singleSubject) => {
    return (
      <option
        className="lectureOptions"
        value={singleSubject.subject}
        key={"ListC-" + singleSubject.subject}
      >
        {singleSubject.subject}
      </option>
    );
  };
  const [dropdownData, setDropdownData] = useState({
    lectureTypes: [],
    lectureTypesMapped: [],
    dropdownsItems: [],
  });
  const mapLectureTypes = (singleLectureType) => {
    return (
      <option
        className="lectureOptions"
        value={singleLectureType.id}
        key={"ListB-" + singleLectureType.id}
      >
        {singleLectureType.name}
      </option>
    );
  };
  useEffect(() => {
    lookUpService
      .getTypes(["LectureTypes"])
      .then(onGetLectureTypeSuccess)
      .catch(onGetLectureTypeError);
  }, []);
  const onGetLectureTypeSuccess = (response) => {
    let newLectures = response.item.lectureTypes;
    setDropdownData((prevState) => {
      const dropdownData = { ...prevState };
      dropdownData.lectureTypes = newLectures;
      dropdownData.dropdownsItems = newLectures.map(mapLectureTypes);
      return dropdownData;
    });
  };
  const onGetLectureTypeError = (err) => {
    _logger(err);
    toastr.error("Lecture types not found. Please try again.");
  };
  useEffect(() => {
    courseService
      .getCourseSubjects()
      .then(onGetCourseSubjectsSuccess)
      .catch(onGetCourseSubjectsError);
  }, []);
  const onGetCourseSubjectsSuccess = (response) => {
    let newSubjects = response.items;
    setDropdownSubjects((prevState) => {
      const dropdownSubjects = { ...prevState };
      dropdownSubjects.subjects = newSubjects;
      dropdownSubjects.dropdownSubjectList = newSubjects.map(mapSubjects);
      return dropdownSubjects;
    });
  };

  const onGetCourseSubjectsError = (err) => {
    _logger(err);
    toastr.options = {
      timeOut: "10",
    };
    toastr.error("Course subjects not found. Please try again.");
  };
  useEffect(() => {
    if (
      pageData.selectedFilter &&
      pageData.selectedFilter !== "0" &&
      pageData.selectedSubject
    ) {
      courseService
        .getCourses(
          pageData.pageIndex,
          pageData.pageSize,
          pageData.selectedSubject,
          pageData.selectedFilter,
        )
        .then(onGetCoursesSuccess)
        .catch(onGetCoursesError);
    } else if (pageData.selectedFilter && pageData.selectedFilter !== "0") {
      courseService
        .getCourses(
          pageData.pageIndex,
          pageData.pageSize,
          pageData.query,
          pageData.selectedFilter
        )
        .then(onGetCoursesSuccess)
        .catch(onGetCoursesError);
    } else if (pageData.selectedSubject) {
      courseService
        .getCourses(
          pageData.pageIndex,
          pageData.pageSize,
          pageData.selectedSubject,
          (pageData.selectedFilter = "")
        )
        .then(onGetCoursesSuccess)
        .catch(onGetCoursesError);
    } else {
      courseService
        .getCourses(
          pageData.pageIndex,
          pageData.pageSize,
          pageData.query,
          (pageData.selectedFilter = "")
        )
        .then(onGetCoursesSuccess)
        .catch(onGetCoursesError);
    }
  }, [
    pageData.pageIndex,
    pageData.selectedFilter,
    pageData.selectedSubject,
    pageData.query,
  ]);
  const handleDropdown = (e) => {
    const selectedFilter = e.target.value;
    setPageData((prevState) => {
      const newState = { ...prevState };
      let typedQuery = newState.query;
      if (typedQuery) {
        typedQuery = newState.query;
      } else {
        newState.query = "";
      }
      if (selectedFilter === "0") {
        newState.selectedFilter = "0";
      } else {
        newState.selectedFilter = selectedFilter.trim();
      }
      let selectedDropdownSubject = newState.selectedSubject;
      if (selectedDropdownSubject) {
        selectedDropdownSubject = newState.selectedSubject;
      } else {
        newState.selectedSubject = "";
      }
      newState.pageIndex = 0;
      return newState;
    });
  };
  const handleDropdownSubject = (e) => {
    const selectedSubject = e.target.value;
    setPageData((prevState) => {
      const newState = { ...prevState };
      let typedQuery = newState.query;
      if (typedQuery) {
        typedQuery = newState.query;
      } else {
        newState.query = "";
      }
      if (selectedSubject === "") {
        newState.selectedSubject = "";
      } else {
        newState.selectedSubject = selectedSubject;
      }
      let filteredLecture = newState.selectedFilter;
      if (filteredLecture > 0) {
        filteredLecture = newState.selectedFilter;
      } else {
        newState.selectedFilter = "0";
      }
      newState.pageIndex = 0;
      return newState;
    });
  };
  const onGetCoursesSuccess = (response) => {
    let ajaxCourses = response.item.pagedItems;
    setPageData((prevState) => {
      const courseData = { ...prevState };
      courseData.totalCount = response.item.totalCount;
      courseData.courses = ajaxCourses;
      courseData.coursesMapped = ajaxCourses.map(mapCourse);
      return courseData;
    });
  };
  const onGetCoursesError = (err) => {
    _logger(err);
    setPageData((prevState) => {
      const courseData = { ...prevState };
      courseData.totalCount = 0;
      courseData.coursesMapped = [];
      return courseData;
    });
  };
  const handlePageChange = (page) => {
    setPageData((prevState) => {
      const coursesPaginated = { ...prevState };
      coursesPaginated.pageIndex = page - 1;
      return coursesPaginated;
    });
  };
  const onSearchChange = (e) => {
    _logger(e);
    const { name, value } = e.target;
    setPageData((prevState) => {
      let searchQuery = { ...prevState };
      searchQuery[name] = value;
      searchQuery.pageIndex = 0;
      _logger(searchQuery[name]);
      return searchQuery;
    });
  };
  const handleReset = (e) => {
    _logger(e);
    setPageData((prevState) => {
      const resetState = { ...prevState };
      resetState.query = "";
      resetState.selectedFilter = "0";
      resetState.selectedSubject = "";
      resetState.pageIndex = 0;
      return resetState;
    });
  };
  return (
    <Fragment>
      <Row className="mx-2 my-2">
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Courses Offered</h1>
            </div>
          </div>
        </Col>
      </Row>
      <div className="container my-2">
        <div className="row">
          <div className="col">
            <Pagination
              className="my-2"
              showTotal={(total, range) =>
                ` ${range[0]}-${range[1]} of ${total}`
              }
              onChange={handlePageChange}
              current={pageData.pageIndex + 1}
              total={pageData.totalCount}
              pageSize={pageData.pageSize}
              locale={locale}
              showLessItems
            />
          </div>
          <div className="col">
            <form className="d-lg-flex align-items-center">
              <span className="position-absolute ps-3 search-icon">
                <i className="fe fe-search"></i>
              </span>
              <Form.Control
                type="Search"
                className="ps-6 formSearchCourses"
                placeholder="Search Course titles or subjects"
                name="query"
                value={pageData.query}
                onChange={onSearchChange}
              />
              <Icon
                path={mdiFilterRemoveOutline}
                size={1}
                onClick={handleReset}
                className="mx-1 courseSearchReset"
                title="Clear Filters"
              ></Icon>
              <select
                onChange={handleDropdown}
                value={pageData.selectedFilter}
                className="form-select mx-1 lectureTypeDropdown"
                aria-label="Default select example"
              >
                <option value={0}>Sort Lecture</option>
                {dropdownData.dropdownsItems}
              </select>
              <select
                onChange={handleDropdownSubject}
                value={pageData.selectedSubject}
                className="form-select mx-1 lectureTypeDropdown"
                aria-label="Default select example"
              >
                <option value={""}>Sort Subject</option>
                {dropdownSubjects.dropdownSubjectList}
              </select>
              <Link to="/course/new">
                <Icon
                  className={
                    currentUser.roles.includes("Admin")
                      ? "courseInfoButton"
                      : "d-none"
                  }
                  path={mdiPlusBox}
                  size={1.5}
                  title="Add a new course"
                />
              </Link>
            </form>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">{pageData.coursesMapped}</div>
      </div>
      <Row>
        <div className="col-5"></div>
        <Pagination
          className="my-2 col-4"
          showTotal={(total, range) => ` ${range[0]}-${range[1]} of ${total}`}
          onChange={handlePageChange}
          current={pageData.pageIndex + 1}
          total={pageData.totalCount}
          pageSize={pageData.pageSize}
          locale={locale}
          showLessItems
        />
        <div className="col-3"></div>
      </Row>
    </Fragment>
  );
};
CourseListView.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
export default CourseListView;
