import { createClient } from "next-sanity";

export default function IndexPage({ authors }) {
  return (
    <>
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main>
        <h2>authors</h2>
        {authors.length > 0 && (
          <ul>
            {authors.map((author) => (
              <li key={author._id}>{author?.name}</li>
            ))}
          </ul>
        )}
        {!authors.length > 0 && <p>No authors to show</p>}
        {authors.length > 0 && (
          <div>
            <pre>{JSON.stringify(authors, null, 2)}</pre>
          </div>
        )}
        {!authors.length > 0 && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        )}
      </main>
    </>
  );
}
const client = createClient({
  projectId: "uhn6b07j",
  dataset: "production",
  apiVersion: "2023-07-21",
  useCdn: false
});

export async function getStaticProps() {
  const authors = await client.fetch('*[_type == "author"]');

  return {
    props: {
      authors
    }
  };
}
