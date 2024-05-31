import { Col, Container, Row } from "react-bootstrap";
import Lottie from "lottie-react";
import animationData from '../assets/lotties/loader.json';
import exp from "constants";

function Loader() {
    return (
        <Container className="d-flex align-items-center" style={{ width: '100vw', height: '100vh' }}>
            <Col>
                <h2 className="d-flex justify-content-center text-success">Loading...</h2>
                <Row className="d-flex justify-content-center" style={{margin: '48px'}}>
                    <Lottie
                        style={{ height: '180px', width: '180px' }}
                        animationData={animationData}
                        loop={true}
                        autoplay={true}
                        rendererSettings={
                            {
                                preserveAspectRatio: "xMidYMid slice"
                            }
                        }
                    />
                </Row>
            </Col>
        </Container>
    );
}

export default Loader;