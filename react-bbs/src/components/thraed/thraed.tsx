import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./thraed.css";

function Thred() {
  const url = "https://railway.bulletinboard.techtrain.dev/";
  const [thred, setThred] = useState<Array<Map<string, string>>>([]);
  const [page, setPage] = useState<number>(0);
  const [nextPageBottonVisible, setnextPageBottonVisible] =
    useState<boolean>(false);
  const [message, setMessage] = useState<any>("");
  const [content, setContent] = useState<string>("");
  let { id } = useParams<{ id: string }>();

  const CallApi = async (offsetpage: number) => {
    try {
      const response = await fetch(
        `${url}threads/${id}/posts?offset=${offsetpage}0`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        setMessage(
          <span className="error-message">スレッドの取得に失敗しました。</span>
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.posts;
    } catch (error) {
      console.error("予期せぬエラーが発生しました");
      console.error(error);
      return [];
    }
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

  const GetThred = async () => {
    try {
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
      setThred(toMap);
    } catch (error) {
      console.error("予期せぬエラーが発生しました");
      console.error(error);
      return [];
    }
  };

  const PostThread = async () => {
    try {
      console.info(`投稿内容:${content}`);
      if (content.length === 0) {
        setMessage(
          <span className="error-message">投稿内容を入力してください。</span>
        );
        return;
      }
      const response = await fetch(`${url}threads/${id}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: content,
        }),
      });

      if (!response.ok) {
        setMessage(<span className="error-message">投稿に失敗しました。</span>);
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        setMessage(<span className="message">投稿に成功しました。</span>);
        setPage(0);
        GetThred();
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    console.info(`次のページ:${page}`);
    GetThred();
  }, [page]);

  return (
    <div className="App-body">
      <h1>スレッド</h1>
      <div className="box">
        <div className="message">{message}</div>
        <div className="input">
          {thred.map((item, index) => (
            <div key={index}>
              <p>{item.get("post")}</p>
            </div>
          ))}
        </div>
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
        <div className="input">
          <label htmlFor="content">投稿内容</label>
          <textarea
            id="content"
            name="content"
            className="content"
            placeholder="投稿内容"
            onChange={(eve) => {
              setContent(eve.target.value);
              eve.currentTarget.style.height = "auto";
              eve.currentTarget.style.height = `${eve.currentTarget.scrollHeight}px`;
            }}
          />
          <button type="submit" onClick={PostThread}>
            投稿
          </button>
        </div>
        <div>
          <span>
            <p className="thred-link">
              <Link to={`/`}>トップに戻る</Link>
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Thred;
