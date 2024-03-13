import { IdentifierType } from './Book';

function BookIdentifierType(isbn: { type: string, identifier: string }) {
    const type = IdentifierType[`${isbn.type}` as keyof typeof IdentifierType]
    return <div><b>{type}:</b> {isbn.identifier}</div>
}

export default BookIdentifierType;