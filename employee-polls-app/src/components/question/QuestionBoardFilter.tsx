import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    questionsFilter as questionsFilterSelector,
    setFilter,
} from "../../features/questions/questionsSlice";
import Dropdown from 'react-bootstrap/Dropdown';

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
                setCurrentFilter("Done");
                break;
            default:
                setCurrentFilter("All");
        }
    }, [questionFilter]);

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {currentFilter}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => dispatchFilter("all")}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => dispatchFilter("new")}>New</Dropdown.Item>
                <Dropdown.Item onClick={() => dispatchFilter("answered")}>Done</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default QuestionBoardFilter;