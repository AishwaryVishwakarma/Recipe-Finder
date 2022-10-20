import axios from "axios";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import Loading from "react-loading";
import InfiniteScroll from "react-infinite-scroll-component";

const API_KEY = "b03fe2b93446436db8121a8a39287a30";

const maxResults = 50;

const baseURL = `https://api.spoonacular.com/recipes/complexSearch?query=chicken&addRecipeInformation=true&number=${maxResults}&apiKey=${API_KEY}`;

function App() {
  /*State for recipes data*/
  const [data, setData] = React.useState(null);
  const [shownData, setShownData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [totalResults, setTotalResults] = React.useState(0);
  const [error, setError] = React.useState("");
  const [splice, setSplice] = React.useState({
    start: 10,
    end: 20,
  });

  /*State for search*/
  const [query, setQuery] = React.useState("rice");

  /*Handle on submit search*/
  const handleSubmit = (event, query) => {
    event.preventDefault();
    setQuery(query);
  };

  /*Fetch data from API*/
  React.useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&number=${maxResults}&apiKey=${API_KEY}`
      )
      .then((res) => {
        setData(res.data.results);
        setShownData(res.data.results.slice(0, 10));
        setTotalResults(res.data.totalResults);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
        setLoading(false);
      });
  }, [query]);

  /*Get more data to Display*/
  const fetchMoreData = () => {
    /*Random number between 500 and 1000*/
    const random = Math.floor(Math.random() * 500) + 500;
    setTimeout(() => {
      setShownData((prev) => {
        return [...prev, ...data.slice(splice.start, splice.end)];
      });
      setSplice((prev) => {
        if (prev.end + 10 > totalResults) {
          return {
            start: prev.start + 10,
            end: totalResults,
          };
        } else {
          return {
            start: prev.start + 10,
            end: prev.end + 10,
          };
        }
      });
    }, random);
  };

  return (
    <div>
      <Navbar handleSubmit={handleSubmit} />
      {loading ? (
        <div className="initial__loading">
          <Loading type="bars" color="#1CAC78" height={100} width={100} />
        </div>
      ) : (
        <>
          {error && <h1 className="error__message">{error}</h1>}
          {error === "" && (
            <InfiniteScroll
              dataLength={shownData.length}
              next={fetchMoreData}
              hasMore={shownData.length < totalResults}
              loader={
                <div className="later__loading">
                  <Loading type="bars" color="#1CAC78" height={50} width={50} />
                </div>
              }
            >
              <div className="cards__section">
                {shownData.map((item) => {
                  return (
                    <Card
                      key={item.id}
                      vegetarian={item.vegetarian}
                      popular={item.veryPopular}
                      title={item.title}
                      readyInMinutes={item.readyInMinutes}
                      servings={item.servings}
                      likes={item.aggregateLikes}
                      healthScore={item.healthScore}
                      image={item.image}
                      id={item.id}
                      summary={item.summary}
                      analyzedInstructions={item.analyzedInstructions}
                    />
                  );
                })}
              </div>
            </InfiniteScroll>
          )}
        </>
      )}
    </div>
  );
}

export default App;
