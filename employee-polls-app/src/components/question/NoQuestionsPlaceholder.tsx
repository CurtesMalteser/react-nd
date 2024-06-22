import Button from "react-bootstrap/esm/Button";
import Card from 'react-bootstrap/Card';
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from '../../assets/lotties/check.json';
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/routes";
import { useRef } from "react";

function NoQuestionsPlaceholder() {
    const navigate = useNavigate();
    const navigateToNewPool = () => { navigate(ROUTES.NEW_QUESTION) };
    const lottieRef = useRef<LottieRefCurrentProps | null>(null);

    const playAnimation = () => (lottieRef.current) && lottieRef.current.goToAndPlay(0);

    return (
        <Card border="success" style={{ marginLeft:'1rem', display: 'flex', flexDirection: 'row' }}>
            <div onMouseEnter={playAnimation} >
                <Lottie
                    lottieRef={lottieRef}
                    style={{
                        margin: '20px',
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
            <Card.Body>
                <Card.Title>There are no questions here...</Card.Title>
                <Card.Text>Why don't you create a new poll?</Card.Text>
                <Button variant="success" onClick={navigateToNewPool}>New Poll</Button>
            </Card.Body>
        </Card>
    )
}

export default NoQuestionsPlaceholder;