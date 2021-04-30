import { Col, Container, Row } from "react-bootstrap";
import "../styles/pages/loader.styles.pages";

function Home() {
  return (
    <Container>
      <div className="container">
        <Row>WelCome to tic-tactoe</Row>
        <Row>
          <Col>1 of 3</Col>
          <Col xs={5}>2 of 3 (wider)</Col>
          <Col>3 of 3</Col>
        </Row>
      </div>
    </Container>
  );
}

export default Home;
