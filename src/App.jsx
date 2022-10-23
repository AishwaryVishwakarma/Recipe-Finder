import axios from "axios";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import Loading from "react-loading";
import InfiniteScroll from "react-infinite-scroll-component";

const API_KEY = "886f90516ab4499d90de942cb36f99fd";

const maxResults = 50;

function App() {

  // console.log("App.jsx");

  /*State for recipes data*/
  const [data, setData] = React.useState(null);
  const [shownData, setShownData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [totalResults, setTotalResults] = React.useState(0);
  const [error, setError] = React.useState("");
  const [splice, setSplice] = React.useState({
    start: 0,
    end: 10,
  });

  /*State for search*/
  const [query, setQuery] = React.useState("rice");

  /*Handle on submit search*/
  const handleSubmit = React.useCallback((query) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery === "") {
      setError("Please enter a valid search query");
      return;
    }
    setQuery(trimmedQuery);
  }, []);

  /*Fetch data from API*/
  React.useEffect(() => {
    setLoading(true);
    setError("");
    setSplice({
      start: 0,
      end: 10,
    });
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&number=${maxResults}&apiKey=${API_KEY}`
      )
      .then((res) => {
        setData(res.data.results);
        if (res.data.results.length === 0) {
          setError("No results found");
        } else {
          setShownData(res.data.results.slice(splice.start, splice.end));
          setTotalResults(
            res.data.results.length > maxResults
              ? maxResults
              : res.data.results.length
          );
        }
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
        return [...prev, ...data.slice(splice.start + 10, splice.end + 10)];
      });
      setSplice((prev) => {
        return {
          start: prev.start + 10,
          end: prev.end + 10,
        };
      });
    }, random);
  };

  return (
    <>
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
              hasMore={
                shownData.length < totalResults && shownData.length !== 0
              }
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
    </>
  );
}

export default App;
