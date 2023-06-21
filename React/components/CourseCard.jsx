import React from "react";
import "./course.css";
import PropTypes from "prop-types";
import debug from "monefi-debug";
import { Image, Card, Col, Row } from "react-bootstrap";
import Icon from "@mdi/react";
import {
  mdiInformationOutline,
  mdiClockOutline,
  mdiHumanMaleBoard,
  mdiBookOpenPageVariant,
} from "@mdi/js";
import { useNavigate } from "react-router-dom";
import AverageRating from "components/ratings/AverageRating";
import avatarDefault from "../../assets/images/avatar/defaultavatar.jpg";
import courseImageDefault from "../../assets/images/placeholder/4by3.jpg";
const _logger = debug.extend("CourseCard");

const CourseCard = ({ oneCourse, theCurrentUser }) => {
  const aCourse = oneCourse;
  const navigate = useNavigate();
  const onCourseClicked = (e) => {
    _logger(e);
    if (theCurrentUser.roles.includes("Admin")) {
      navigate(`/course/${aCourse.id}/detail/`, { state: aCourse });
    } else if (theCurrentUser.roles.includes("User")) {
      navigate(`/course/${aCourse.id}/detail/`, { state: aCourse });
    } else if (theCurrentUser.roles.length < 1) {
      navigate(`/course/${aCourse.id}/info/`, { state: aCourse });
    }
  };
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 px-1">
      <Card className="my-2 mb-4 card-hover mx-1 cardListText">
        <div className="bg-image">
          <span className="notify-badge courseSubjectBadge">
            {aCourse.subject}
          </span>
          <img
            src={aCourse.coverImageUrl}
            className="card-img-top rounded-top-md cardCourseImage"
            alt=""
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = courseImageDefault;
            }}
          />
        </div>

        <Card.Body className="p-3">
          <Card.Text className="h3 text-inherit">{aCourse.title}</Card.Text>
          <Card.Text className="text-inherit">
            <Icon path={mdiBookOpenPageVariant} size={1} />{" "}
            {aCourse.description}
          </Card.Text>
          <Card.Text className="text-inherit">
            <Icon path={mdiHumanMaleBoard} size={1} />{" "}
            {aCourse.lectureType.name}
          </Card.Text>
          <Card.Text className="text-inherit">
            <Icon path={mdiClockOutline} size={1} /> {aCourse.duration}
          </Card.Text>
          <AverageRating
            entityId={aCourse.id}
            entityTypeId={aCourse.lectureType.id}
          />
        </Card.Body>
        <Card.Footer className="py-2">
          <Row className="align-items-center g-0">
            <Col className="col-auto">
              <Image
                src={aCourse.createdBy.avatarUrl}
                className="rounded-circle avatar"
                alt=""
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = avatarDefault;
                }}
              />
            </Col>
            <Col className="col ms-2">
              <span className="text-inherit">
                {aCourse.instructor.firstName} {aCourse.instructor.lastName}
              </span>
            </Col>
            <Col className="col-auto">
              <Icon
                className="courseInfoButton"
                path={mdiInformationOutline}
                size={1.4}
                onClick={onCourseClicked}
                title="See course details"
              ></Icon>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
};
CourseCard.propTypes = {
  oneCourse: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    coverImageUrl: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    instructor: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      mi: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    lectureType: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string]))
      .isRequired,
  }).isRequired,
  theCurrentUser: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
export default CourseCard;
