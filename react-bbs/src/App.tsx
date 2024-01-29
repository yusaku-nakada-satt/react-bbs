import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/header";

function App() {
  const [title, setTitle] = useState<Array<Map<string, string>>>([]);
  const url = "https://railway.bulletinboard.techtrain.dev/";

  useEffect(() => {
    const fetchTitles = async () => {
      let titleList: Array<Map<string, string>> = [];
      let whileFlg: boolean = true;
      let i = 0;
      while (whileFlg) {
        try {
          const response = await fetch(`${url}/threads?offset=${i}0`);
          const data = await response.json();
          const mapData = data.map(
            (item: any) => new Map(Object.entries(item))
          );
          titleList = titleList.concat(mapData);
          if (data.length < 10) {
            whileFlg = false;
            break;
          }
          i++;
        } catch (error) {
          console.error(error);
          break;
        }
      }
      console.info(`掲示板取得件数:${titleList.length}`);
      setTitle(titleList);
    };

    fetchTitles();
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
