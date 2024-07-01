
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Image from 'react-bootstrap/esm/Image';
import Logo from '../../assets/img/employees_pool_logo.jpg'

function ErrorComponent({label}:{label: string}) {

    return (
        <Container className="md-6" style={{ marginTop: 20, marginBottom: 20, marginLeft: "auto", marginRight: "auto" }} >
            <Col>
                <Row className='d-flex justify-content-center'>
                    <Image
                        src={Logo}
                        style={{
                            width: '400px',
                            height: '400px',
                            marginBottom: '48px',
                        }}
                        roundedCircle
                        alt="logo"
                    />
                </Row>
                <Row style={{ marginBottom: "48px" }}>
                    <h1 className="d-flex justify-content-center">Oops! Somenthing went wrong...</h1>
                </Row>
                <Row style={{ marginBottom: "48px" }}>
                    <h2 className="d-flex justify-content-center">{label}</h2>
                </Row>
            </Col>
        </Container>
    )
}

export default ErrorComponent;