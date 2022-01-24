import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import Loader from "../components/Loader";

function SingleProject() {
  const [singleProject, setSingleProject] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  function handleClick() {
    navigate('/projects')
  }

  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                }
            },
            body,
            "name": author->name,
            "authorImage": author->image
        }`
      )
      .then((data) => {
        setSingleProject(data[0]);
        console.log(data[0]);
        setLoading(false);
      })
      .catch(console.error);
  }, [slug]);

  const builder = imageUrlBuilder(sanityClient);
  function urlFor(source) {
    return builder.image(source);
  }
  return (
    <>
      {loading && <Loader />}
      {!singleProject && <Loader />}

      {singleProject && (
        <div className="hero min-h-screen bg-base-200">
          <div className="flex-col hero-content lg:flex-row-reverse">
            <img
              src={singleProject.mainImage.asset.url}
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="mb-5 text-5xl font-bold">{singleProject.title}</h1>
              <BlockContent
                blocks={singleProject.body}
                projectId="9fxbut7g"
                dataset="production"
                className="mb-7"
              />
              <button
                className="btn btn-custom btn-accent mt-5"
                style={{ color: "#f1f1f1" }}
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleProject;
