
import { render } from "@testing-library/react";
import PollOption from "./PollOption";


describe('PollOption', () => {

    it('renders zero votes without crashing, votes and progress are not in the document', () => {
        const {getByText, getByRole, queryByText} = render(
            <PollOption
                option={{ text: 'Option one', votes: [] }}
                isSelected={false}
                votes={{ optionVotes: 0, totalVotes: 0 }}
                clickHandler={() => { }} />
        );
        expect(getByText('Option one')).toBeInTheDocument();

        const button = getByRole('button', {name: 'Click'})
        expect(button).toBeInTheDocument();

        expect(queryByText('0 out of 0 users chose this option')).not.toBeInTheDocument();

        const progress = queryByText('progressbar')
        expect(progress).not.toBeInTheDocument();
    });

    it('renders number votes and percentage correctly', () => {
        const {getByText, getByRole} = render(
            <PollOption
                option={{ text: 'Option two', votes: [] }}
                isSelected={false}
                votes={{ optionVotes: 1, totalVotes: 3 }}
                clickHandler={() => { }} />
        );

        expect(getByText('Option two')).toBeInTheDocument();

        const button = getByRole('button', {name: 'Click'})
        expect(button).toBeInTheDocument();

        expect(getByText('1 out of 3 users chose this option')).toBeInTheDocument();

        const progress = getByRole('progressbar')
        expect(progress).toBeInTheDocument();
        expect(progress.children[0].textContent).toBe('33.33%');
        
    });
});