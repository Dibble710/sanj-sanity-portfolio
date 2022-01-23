function About() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: 'url("https://picsum.photos/id/1005/1600/1400")',
      }}
    >
      <div className="hero-overlay bg-opacity-60" />
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button
              className="btn btn-outline btn-accent"
              style={{ color: "#f1f1f1" }}
            >
              Contact Me
            </button>
        </div>
      </div>
    </div>
  );
}

export default About;
