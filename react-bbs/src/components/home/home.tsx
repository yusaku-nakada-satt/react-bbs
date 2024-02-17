import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [title, setTitle] = useState<Array<Map<string, string>>>([]);
  const url = "https://railway.bulletinboard.techtrain.dev/";

  // conponetsに切り出す
  // custom hookがよいのでは？
  const fetchTitles = async () => {
    let titleList: Array<Map<string, string>> = [];
    let hasMoreData: boolean = true;
    let i = 0;
    try {
      while (hasMoreData) {
        // ページネーションを考慮して数件ずつ取得する
        // 10件だったら次へ2つ目のページを取得するなど
        const response = await fetch(`${url}/threads?offset=${i}0`);
        const data = await response.json();
        const mapData = data.map((item: any) => new Map(Object.entries(item)));
        titleList = [...titleList, ...mapData];
        if (data.length < 10) {
          hasMoreData = false;
        }
        // 0件だったら0けんで返す
        i++;
      }
      console.info(`掲示板取得件数:${titleList.length}`);
      return titleList;
    } catch (error) {
      console.error(error);
      // 0件なのかエラーなのか判別させる
      // ダイアログやエラーメッセージ表示領域を作るなどある
      // ユーザーにフィードバックさせる
      return [];
    }
  };

  useEffect(() => {
    fetchTitles().then((result) => {
      setTitle(result);
    });
  }, []);

  return (
    <div className="App-body">
      {title.map((item, index) => (
        <div key={index}>
          <Link to={`/thread/${item.get("id")}`}>
            {item.get("title")}/{item.get("id")}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
