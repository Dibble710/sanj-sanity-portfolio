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
        profilePicture{
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
        profileData.map((author) => (
          <div className="hero min-h-screen home-hero rounded">
            <div className="flex-col hero-content lg:flex-row-reverse">
              <div>
                <h1 className="mb-5 text-5xl font-bold">Howdy, I'm Sanj!</h1>
                <p className="mb-5">
                  I’m studying marketing both in terms of brand strategy and
                  graphic design. I’m constantly looking for opportunities to
                  grow in my skills. I love creating content and illustration,
                  but I’m also looking to hone my brand strategy and marketing
                  skills. I have various experiences in many different areas of
                  the field because I never say no to a new opportunity, and I’d
                  love to work with you!
                </p>
                <Link to='/about'>
                  <button
                    className="btn btn-outline btn-accent"
                    style={{ color: "#f1f1f1" }}
                  >
                    More info
                  </button>
                </Link>
              </div>
              <img
                src={author.profilePicture.asset.url}
                className="max-w-md rounded-lg shadow-2xl mx-10 pfp-home"
                alt="Sanj Gagrani"
              />
            </div>
          </div>
        ))}
    </>
  );
}

export default Home;
