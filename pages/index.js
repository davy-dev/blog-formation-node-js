import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Article from "../models/Article";

const Index = ({ articles }) => (
  <>
    {/* Create a card for each pet */}
    {articles.map((article) => (
      <div key={article._id}>
        <div className="card">
          <img src={article.image_url} />
          <h5 className="article-name">{article.title}</h5>
          <div className="main-content">
            <p className="article-name">{article.summary}</p>
            <p className="owner">Owner: {article.content}</p>

            {/* Extra article Info: Likes and Dislikes */}
            <div className="likes info">
              <p className="label">Tags</p>
              <ul>
                {article.tags.map((data, index) => (
                  <li key={index}>{data} </li>
                ))}
              </ul>
            </div>
            <p className="label">Catégories</p>
            <ul>
              {article.dislikes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${article._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${article._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const articles = await Article.find({});

  return { props: { articles } };
}

export default Index;
