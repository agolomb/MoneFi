import React from "react";
import "./course.css";
import PropTypes from "prop-types";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiBookOpenPageVariant, mdiClockOutline } from "@mdi/js";
import courseImageDefault from "../../assets/images/placeholder/4by3.jpg";
import debug from "sabio-debug";
const _logger = debug.extend("CourseLectureCard");

const CourseLectureCard = ({ oneLecture }) => {
  _logger(oneLecture);
  const aLecture = oneLecture;
  return (
    <Col>
      <Card className="mt-2 mb-2 cardFormat mx-auto justify-content-center card-hover courseLectureCardParent">
        <Card.Body className="mx-auto justify-content-center mh-25 courseLectureCardBody">
          <Card.Title className="d-flex align-items-center">
            <img
              size="6"
              src={aLecture.imageUrl}
              className="col-3 float-start"
              alt=""
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = courseImageDefault;
              }}
            />
          </Card.Title>
          <ListGroup as="ul" bsPrefix="list-inline" className="">
            <ListGroup.Item
              as="li"
              bsPrefix="list-inline-item"
              className="mb-1"
            >
              <Icon path={mdiBookOpenPageVariant} size={1} /> {aLecture.title}
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              bsPrefix="list-inline-item"
              className="py-1"
            >
              <Icon path={mdiClockOutline} size={1} /> {aLecture.duration}
            </ListGroup.Item>

            <Card.Footer className="courseLectureCardFooter">
              <Row className="align-items-center g-0">
                <ListGroup.Item as="li" bsPrefix="list-inline-item">
                  {aLecture.description}
                </ListGroup.Item>
              </Row>
            </Card.Footer>
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
};
CourseLectureCard.propTypes = {
  oneLecture: PropTypes.shape({
    id: PropTypes.number.isRequired,
    courseId: PropTypes.number.isRequired,
    subject: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    fileUrl: PropTypes.string.isRequired,
  }),
};
export default CourseLectureCard;
