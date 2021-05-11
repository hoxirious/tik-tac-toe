import React from "react";
import {
  Row,
  Col,
  Popover,
  Spinner,
  Button,
  Container,
  OverlayTrigger,
} from "react-bootstrap";
import { useStoreState } from "../../store/hooks.store";

function Pending() {
  const { gameId } = useStoreState((store) => {
    return store.joinModel;
  });
  const popover = (
    <Popover id="popover-basic">
      <Popover.Content className="all-copy">{`${gameId}`}</Popover.Content>
    </Popover>
  );
  return (
    <Container className=" d-flex flex-column align-items-center justify-content-center">
      <Row className="mb-2">
        <Spinner animation="border" role="status" size="sm">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Row>
      <Row className="mb-2">
        <p>Mama told me to wait here...</p>
      </Row>
      <Row>
        <Col>
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button variant="success">Game Id</Button>
          </OverlayTrigger>
        </Col>
      </Row>
    </Container>
  );
}

export default Pending;
