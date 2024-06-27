import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Option from "../../utils/option";
import ProgressBar from "react-bootstrap/esm/ProgressBar";

const getVotePercentages = (optionVotes: number, totalVotes: number) => totalVotes > 0
    ? (optionVotes / totalVotes) * 100 : 0;


function PollOption({
    option,
    isSelected,
    votes,
    clickHandler,
}: { option: Option, isSelected: boolean, votes: { optionVotes: number, totalVotes: number }, clickHandler: () => void }) {

    const votePercentage = getVotePercentages(votes.optionVotes, votes.totalVotes);

    return (
        <Col >
            <Card border="success">
                <Card.Body>
                    <Card.Title className="d-flex justify-content-center">{option.text}</Card.Title>
                    {(votes.totalVotes > 0) && (
                        <>
                            <Card.Text className="d-flex justify-content-center">
                                {votes.optionVotes} out of {votes.totalVotes} users chose this option
                            </Card.Text>
                            <ProgressBar
                                className="mb-3"
                                style={{ height: '30px' }}
                                variant='success'
                                now={votePercentage}
                                label={<span style={{fontSize: '1rem' }}>{`${votePercentage.toFixed(2)}%`}</span>}
                            />
                        </>
                    )}
                    <Button className="w-100" variant="success" onClick={clickHandler}>{isSelected && <b>{'\u2713'} </b>}Click</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default PollOption;