import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/header";

function App() {
  const [title, setTitle] = useState<Array<Map<string, string>>>([]);
  const url = "https://railway.bulletinboard.techtrain.dev/";

  const fetchTitles = async () => {
    let titleList: Array<Map<string, string>> = [];
    let hasMoreData: boolean = true;
    let i = 0;
    try {
      while (hasMoreData) {
        const response = await fetch(`${url}/threads?offset=${i}0`);
        const data = await response.json();
        const mapData = data.map((item: any) => new Map(Object.entries(item)));
        titleList = [...titleList, ...mapData];
        if (data.length < 10) {
          hasMoreData = false;
        }
        i++;
      }
      console.info(`掲示板取得件数:${titleList.length}`);
      return titleList;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    fetchTitles().then((result) => {
      setTitle(result);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="App-body">
        {title.map((item, index) => (
          <div key={index}>{item.get("title")}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
