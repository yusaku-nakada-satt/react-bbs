import { ChangeEvent, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import "./newThred.css";

function NewThred() {
  const url = "https://railway.bulletinboard.techtrain.dev/";
  const [thredTitle, setThredTitle] = useState<string>("");
  const [message, setMessage] = useState<any>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setThredTitle(event.target.value);
    console.log(thredTitle);
  };

  const createThred = async () => {
    const data = {
      title: thredTitle,
    };

    try {
      const response = await fetch(`${url}/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage(<span className="message">スレッドを作成しました</span>);
        console.log("スレッドを作成しました");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      setMessage(
        <span className="error-message">スレッドの作成に失敗しました。</span>
      );
    }
  };

  return (
    <div className="App-body">
      <h1>スレッド新規作成</h1>
      <div className="content">
        <div className="message">{message}</div>
        <div className="input">
          <label htmlFor="title">スレッドタイトル</label>
          <input
            type={thredTitle}
            id="thredTitle"
            name="thredTitle"
            placeholder="スレッドタイトル"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span>
            <p className="thred-link">
              <Link to={`/`}>トップに戻る</Link>
            </p>
          </span>
          <button type="submit" onClick={createThred}>
            作成
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewThred;
