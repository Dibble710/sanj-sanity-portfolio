import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sanityClient from "../client";
import BlockContent from "@sanity/block-content-to-react";
import Loader from "../components/Loader";

function SingleProject() {
  const [singleProject, setSingleProject] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

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
            backgroundImage{
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

  return (
    <>
      {loading && <Loader />}
      {!singleProject && <Loader />}

      {singleProject && (
        <div
          className="hero min-h-screen bg-base-200"
          style={{
            backgroundImage: `url(${singleProject.backgroundImage.asset.url})`,
          }}
        >
          <div className="card glass lg:card-side text-neutral-content">
            <figure className="p-6">
              <img
                src={singleProject.mainImage.asset.url}
                className="rounded-lg shadow-lg single-image"
                alt={singleProject.title}
              />
            </figure>
            <div className="max-w-md card-body">
              <h2 className="card-title">{singleProject.title}</h2>
              <BlockContent
                blocks={singleProject.body}
                projectId="9fxbut7g"
                dataset="production"
                className="project-desc"
              />
              <button
                className="btn btn-custom hover-white btn-accent mt-5 hover:text-white"
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
