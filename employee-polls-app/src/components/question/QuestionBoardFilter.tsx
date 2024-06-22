import './QuestionBoardFilter.css';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import {
    questionsFilter as questionsFilterSelector,
    setFilter,
} from "../../features/questions/questionsSlice";

function QuestionBoardFilter() {

    const [currentFilter, setCurrentFilter] = useState("All");

    const dispatch = useAppDispatch();
    const questionFilter = useAppSelector(questionsFilterSelector);

    const dispatchFilter = (filter: "all" | "answered" | "new") => {
        dispatch(setFilter(filter));
    }

    useEffect(() => {
        switch (questionFilter) {
            case "all":
                setCurrentFilter("All");
                break;
            case "new":
                setCurrentFilter("New");
                break;
            case "answered":
                setCurrentFilter("Answered");
                break;
            default:
                setCurrentFilter("All");
        }
    }, [questionFilter]);

    return (
        <Container className="filter-container border border-success rounded">
            <Row>
                <Col sm={'auto'}><h4 className='filter-label'>Filter Questions</h4></Col>
                <Col>
                    <SplitButton variant="success" id="dropdown-basic"
                        title={currentFilter}>
                        <Dropdown.Item onClick={() => dispatchFilter("all")}>All</Dropdown.Item>
                        <Dropdown.Item onClick={() => dispatchFilter("new")}>New</Dropdown.Item>
                        <Dropdown.Item onClick={() => dispatchFilter("answered")}>Answered</Dropdown.Item>
                    </SplitButton>
                </Col>
            </Row>
        </Container>
    );
}

export default QuestionBoardFilter;