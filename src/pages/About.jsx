import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client";
import Loader from "../components/Loader";

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();

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
        setAboutData(data);
        console.log(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);
  return (
    <>
      {loading && <Loader />}

      {aboutData &&
        aboutData.map((author, index) => (
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: `url(${author.image.asset.url})`,
            }}
            key={author.image.asset._id}
          >
            <div className="hero-overlay bg-opacity-60" />
            <div className="text-center hero-content text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">{author.name}</h1>
                <p className="mb-5">
                  {author.bio[0].children[0].text}
                </p>
                <Link to="/contact">
                  <button
                    className="btn btn-outline btn-accent"
                    style={{ color: "#f1f1f1" }}
                  >
                    Contact Me
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default About;
