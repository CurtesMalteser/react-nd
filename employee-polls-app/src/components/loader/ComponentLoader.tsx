import { Container } from "react-bootstrap";
import Loader from "./Loader";

function ComponentLoader() {
    return (
        <Container className="d-flex align-items-center" style={{ width: '100vw', height: '100vh' }}>
            <Loader />
        </Container>
    );
}

export default ComponentLoader;