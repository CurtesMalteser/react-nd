import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Loader from "./Loader";
import Logo from '../../assets/img/employees_pool_logo.jpg';

function HomeLoader() {
    return (<Container
      className='md-6 d-flex justify-content-center align-items-center'
      style={{
        width: '100vw',
        height: '100vh',
        marginTop: "20px",
        marginBottom: "20px",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
      <Col>
        <div className='d-flex justify-content-center'>
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
        </div>
        <Loader />;
      </Col>
    </Container>
    )
  }

export default HomeLoader;