import { useParams } from "react-router-dom";


function BookDetails() {

    const params = useParams();

    return (
        <div>
            <h2>book title for id {params.id}</h2>
            <p>Author: book author</p>
            <p>Genre: book genre</p>
        </div>
    );
};

export default BookDetails;