import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import sanityClient from "../client";
import Loader from "../components/Loader";

function Home() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"] {
          name,
          image{
            asset->{
                _id,
                url
            }
        },
          bio
    }`
      )
      .then((data) => {
        setProfileData(data);
        console.log(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);
  return (
    <>
      {loading && <Loader />}

      {profileData &&
        profileData.map((author, index) => (
          <div
            className="card home-card text-center shadow-2xl"
            key={author.name}
          >
            <figure className="px-10 pt-10 flex items-center justify-center w-full">
              <img
                src={author.image.asset.url}
                className="rounded-xl profile-picture"
                alt="Author"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl text-white">
                Howdy, I'm Sanj!
              </h2>
              <p>
                I’m studying marketing both in terms of brand strategy and
                graphic design. I’m constantly looking for opportunities to grow
                in my skills. I love creating content and illustration, but I’m
                also looking to hone my brand strategy and marketing skills. I
                have various experiences in many different areas of the field
                because I never say no to a new opportunity, and I’d love to
                work with you!
              </p>
              <div className="justify-center card-actions">
                <Link to='/about'>
                  <button
                    className="btn btn-outline btn-accent"
                    style={{ color: "#f1f1f1" }}
                  >
                    More info
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default Home;
