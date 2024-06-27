import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RefObject, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userID as userIDSelector } from "../features/authedUser/authedUserSlice";
import { postNewPoll, status as submitPollStatus } from "../features/questions/newPollQuestionSlice";
import ComponentLoader from "../components/loader/ComponentLoader";
import useRequireAuth from "../hooks/useRequireAuth";
import { useNavigate } from "react-router-dom";
import ROUTES from "../constants/routes";

function PollForm({ label, placeholder, optionRef }: {
    label: string,
    placeholder: string,
    optionRef: null | RefObject<HTMLInputElement>,
}) {
    return (
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder={placeholder}
                ref={optionRef}
            />
        </Form.Group>
    )
}

function NewPollPage() {

    useRequireAuth();

    const dispatch = useAppDispatch();

    const userID = useAppSelector(userIDSelector);
    const status = useAppSelector(submitPollStatus);
    const previousStatus = useRef(status);

    const [validated, setValidated] = useState(false);

    const optionOneRef = useRef<HTMLInputElement>(null);
    const optionTwoRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (previousStatus.current === 'loading' && status === 'idle') {
            setValidated(false);
            optionOneRef.current!.value = '';
            optionTwoRef.current!.value = '';
            navigate(ROUTES.HOME);
        }
        previousStatus.current = status;
    }, [status, navigate]);

    const handleSubmit = (event: {
        currentTarget: any;
        preventDefault: () => void;
        stopPropagation: () => void;
    }) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false || typeof userID === 'undefined') {
            event.stopPropagation();
            setValidated(false);
        } else {
            setValidated(true);
            dispatch(postNewPoll({
                optionOne: optionOneRef?.current?.value ?? 'it is null one',
                optionTwo: optionTwoRef?.current?.value ?? 'it is null two',
                author: userID as string,
            }))
        };
    }

    if (status === 'loading') { return <ComponentLoader /> }

    return (
        <Container className="md-6" style={{ marginTop: 20, marginBottom: 20, marginLeft: "auto", marginRight: "auto" }}>
            <Col>
                <Row style={{ marginBottom: "48px" }}>
                    <h2 className="d-flex justify-content-center" style={{marginBottom:"20px"}}>Would you rather</h2>
                    <h4 className="d-flex justify-content-center">Create your own poll</h4>
                </Row>
                <Row>
                    <Form validated={validated} onSubmit={handleSubmit}>
                        <PollForm
                            label="First Option"
                            placeholder="Option One"
                            optionRef={optionOneRef}
                        />
                        <PollForm
                            label="Second Option"
                            placeholder="Option Two"
                            optionRef={optionTwoRef}
                        />
                        <Button type="submit" variant="success">Submit</Button>
                    </Form>
                </Row>
            </Col>
        </Container>
    );
}

export default NewPollPage; 