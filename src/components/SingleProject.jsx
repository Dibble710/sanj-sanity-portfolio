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
    navigate("/projects");
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

  const builder = imageUrlBuilder(sanityClient);
  function urlFor(source) {
    return builder.image(source);
  }
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
          <img src={singleProject.mainImage.asset.url} className="rounded-lg shadow-lg single-image" />
        </figure> 
        <div className="max-w-md card-body">
          <h2 className="card-title">{singleProject.title}</h2>
          <BlockContent
            blocks={singleProject.body}
            projectId="9fxbut7g"
            dataset="production"
            className="project-desc"
          />
        </div>
      </div>
        </div>
      )}
    </>
  );
}

export default SingleProject;
