import { Col, Row } from "react-bootstrap";
import Lottie from "lottie-react";
import animationData from '../../assets/lotties/loader.json';

function Loader() {
    return (
        <Col>
            <h2 className="d-flex justify-content-center text-success">Loading...</h2>
            <Row className="d-flex justify-content-center" style={{ margin: '48px' }}>
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
    );
}

export default Loader;