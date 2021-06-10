import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Post from "./components/Post";

function App() {
  const [data, setData] = useState();
  const [contents, setContents] = useState();
  const [details, setDetails] = useState();
  async function getData() {
    const { data } = await axios.get("/data");
    // return data;
    const { titles, details, contents } = data;
    setData(data);
    console.log(data);
  }
  useEffect(() => {
    getData();
  }, []);
  // getData();
  // useEffect(() => {
  //   getData();
  // }, []);
  // const { titles, details, contents } = getData();
  return (
    <div>
      {data?.map((post) => (
        <Post data={post} />
      ))}
    </div>
  );
}

export default App;
