import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const url = "https://railway.bulletinboard.techtrain.dev/";
  const [title, setTitle] = useState<Array<Map<string, string>>>([]);
  const [page, setPage] = useState<number>(0);
  const [nextPageBottonVisible, setnextPageBottonVisible] =
    useState<boolean>(false);

  const CallApi = async (offsetpage: number) => {
    try {
      const response = await fetch(`${url}/threads?offset=${offsetpage}0`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("予期せぬエラーが発生しました");
      console.error(error);
      return [];
    }
  };

  const fetchTitles = async () => {
    const data = await CallApi(page);
    let toMap = data.map
      ? data.map((item: any) => new Map(Object.entries(item)))
      : [];
    const nextPageData = await CallApi(page + 1);
    console.info(`nextPageData: ${nextPageData.length}`);
    if (nextPageData.length > 0) {
      setnextPageBottonVisible(true);
      console.info(`次のページ:${page}`);
    } else {
      setnextPageBottonVisible(false);
      console.info(`次のページなし:${page}`);
    }
    console.info(`スレッド取得件数:${data.length}`);
    setTitle(toMap);
  };

  const GetNextPage = async () => {
    console.info(`今のページ:${page}`);
    setPage(page + 1);
    console.info(`次のページ:${page}`);
  };

  const GetForwordPage = async () => {
    console.info(`今のページ:${page}`);
    setPage(page - 1);
    console.info(`次のページ:${page}`);
  };

  useEffect(() => {
    fetchTitles();
  }, [page]);

  return (
    <div className="App-body">
      {title.map((item, index) => (
        <div key={index}>
          <Link to={`/thread/${item.get("id")}`}>{item.get("title")}</Link>
        </div>
      ))}
      <div className="page-botton">
        {page > 0 && (
          <button
            type="submit"
            onClick={GetForwordPage}
            className="forword-page"
          >
            前のページ
          </button>
        )}
        {nextPageBottonVisible && (
          <button type="submit" onClick={GetNextPage} className="next-page">
            次のページ
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
