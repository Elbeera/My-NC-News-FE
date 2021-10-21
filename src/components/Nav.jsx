import { useEffect, useState } from "react";
import { getTopics } from "../utils/api";
import styled from "styled-components";

const Section = styled.section`
  background-color: #3baaad;
  border-radius: 15%;
  padding: 5px;
  margin: 5px;
`;

const Label = styled.label`
  padding: 0px 10px 0px 30px;
`;

const PageTitle = styled.h1`
  color: white;
  font-size: 30px;
  margin: 0;
`;

const Nav = ({ setCurrentFilter, article, setArticle }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then((topicsFromApi) => {
        setTopics(topicsFromApi.topics);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, []);

  return (
    <Section>
      {!article ? (
        <>
          <Label htmlFor="topics">Topics: </Label>
          <select
            name="select-topic"
            id="select-topic"
            onChange={(e) => {
              const filter = e.target.value;
              setCurrentFilter(filter === "All" ? null : filter);
            }}
          >
            <option value="All">All</option>

            {topics.map((topic) => {
              return (
                <option value={topic.topic} key={topic.topic_id}>
                  {topic.slug}
                </option>
              );
            })}
          </select>
          <Label htmlFor="sortBy">Sort-by: </Label>
          <select name="sortBy" id="">
            <option key="date">Date</option>
            <option key="votes">Votes</option>
            <option key="comment_count">No. of Comments</option>
          </select>
        </>
      ) : (
        <>
          <PageTitle>Article</PageTitle> <br />
          <button
            onClick={() => {
              setArticle(null);
            }}
          >
            Go back to all Articles
          </button>
        </>
      )}
    </Section>
  );
};

export default Nav;
