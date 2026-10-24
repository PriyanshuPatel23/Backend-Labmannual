import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function ItemPage() {
    const { id } = useParams<{ id: string }>();

    if (!id) notFound();

    return (
        <section style={{ padding: '2rem' }}>
            <h2>Item Details</h2>
            <p>You are viewing item with <strong>ID = {id}</strong></p>
        </section>
    );
}
