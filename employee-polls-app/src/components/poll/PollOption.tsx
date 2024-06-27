import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Option from "../../utils/option";

const getVotePercentages = (optionVotes: number, totalVotes: number) => totalVotes > 0
    ? (optionVotes / totalVotes) * 100 : 0;


function PollOption({
    option,
    isSelected,
    votes,
    clickHandler,
}: { option: Option, isSelected: boolean, votes: { optionVotes: number, totalVotes: number }, clickHandler: () => void }) {
    console.log(`votes: ${votes.optionVotes} totalVotes: ${votes.totalVotes} percentage: ${getVotePercentages(votes.optionVotes, votes.totalVotes)}`);

    return (
        <Col >
            <Card border="success">
                <Card.Body>
                    <Card.Title className="d-flex justify-content-center">{option.text}</Card.Title>
                    <Button className="w-100" variant="success" onClick={clickHandler}>{isSelected && <b>{'\u2713'} </b>}Click</Button>
                    {(votes.totalVotes > 0) && <Card.Text className="d-flex justify-content-center">{votes.optionVotes} out of {votes.totalVotes} votes</Card.Text>}
                </Card.Body>
            </Card>
        </Col>
    );
}

export default PollOption;