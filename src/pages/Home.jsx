function Home() {
  return (
    <>
      <div className="card home-card text-center shadow-2xl">
        <figure className="px-10 pt-10">
          <img
            src="https://picsum.photos/id/1005/400/250"
            className="rounded-xl"
            alt=""
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-xl text-white">Howdy, I'm Sanj!</h2>
          <p>
            I’m studying marketing both in terms of brand strategy and graphic
            design. I’m constantly looking for opportunities to grow in my
            skills. I love creating content and illustration, but I’m also
            looking to hone my brand strategy and marketing skills. I have
            various experiences in many different areas of the field because I
            never say no to a new opportunity, and I’d love to work with you!
          </p>
          <div className="justify-center card-actions">
            <button
              className="btn btn-outline btn-accent"
              style={{ color: "#f1f1f1" }}
            >
              More info
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
