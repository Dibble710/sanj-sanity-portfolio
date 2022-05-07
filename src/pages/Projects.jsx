import { useState, useEffect } from "react";
import sanityClient from "../client";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

function Projects() {
  
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] {
      title,
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
      slug
    }`
      )
      .then((data) => {
        setProjectData(data);
        console.log(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);
  return (
    <>

    {loading && (
      <Loader />
    )}
      <div>
        {projectData &&
          projectData.map((project, index) => (
            <div
              className="flex items-center w-full px-4 py-10 bg-cover card bg-base-200 mb-5"
              style={{
                backgroundImage: `url(${project.backgroundImage.asset.url})`,
              }}
              key={project.backgroundImage.asset._id}
            >
              <div className="card glass lg:card-side text-neutral-content">
                <figure className="p-6">
                  <img
                    src={project.mainImage.asset.url}
                    className="rounded-lg shadow-lg project-image"
                    alt={project.title}
                  />
                </figure>
                <div className="max-w-md card-body">
                  <h2 className="card-title">{project.title}</h2>
                  
                  <p>{project.body? project.body[0].children[0].text : ''}</p>
                  <div className="card-actions">
                  <Link to={"/projects/" + project.slug.current} key={project.slug.current}>
                    <button
                      className="btn btn-outline btn-accent"
                      style={{ color: "#f1f1f1" }}
                    >
                      View Project
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Projects;
