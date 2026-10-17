export default function About() {
  return (
    <div className="row">
      <div className="col-md-8 mx-auto">
        <h1 className="mb-4">About Us</h1>
        <p className="lead">
          This is the About page of our Next.js application.
        </p>
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Our Mission</h5>
            <p className="card-text">
              We are learning Next.js routing and navigation in Lab 20.
              Next.js uses a file-system based router where folders define routes.
            </p>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Technologies Used</h5>
            <ul>
              <li>Next.js 15 (App Router)</li>
              <li>React 19</li>
              <li>Bootstrap 5</li>
              <li>TypeScript</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
