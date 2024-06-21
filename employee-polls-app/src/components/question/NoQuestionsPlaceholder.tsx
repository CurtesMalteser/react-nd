import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from '../../assets/lotties/check.json';
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/routes";
import { useRef } from "react";

function NoQuestionsPlaceholder() {
    const navigate = useNavigate();
    const navigateToNewPool = () => { navigate(ROUTES.NEW_QUESTION) };
    const lottieRef = useRef<LottieRefCurrentProps | null>(null);

    const playAnimation = () => (lottieRef.current) && lottieRef.current.goToAndPlay(0);

    return (
        <Row style={{ marginTop: '20px' }}>
            <Col xs="auto">
                <div onMouseEnter={playAnimation} >
                    <Lottie
                        lottieRef={lottieRef}
                        style={{
                            height: '180px',
                            width: '180px',
                        }}
                        animationData={animationData}
                        loop={false}
                        autoplay={true}
                        rendererSettings={{
                            preserveAspectRatio: "xMidYMid slice"
                        }}
                    />
                </div>
            </Col>
            <Col>
                <h4>There are no questions here...</h4>
                <p>Why don't you create a new poll?</p>
                <Button className="w-100" variant="success" onClick={navigateToNewPool} >New Poll</Button>
            </Col>
        </Row>
    )
}

export default NoQuestionsPlaceholder;