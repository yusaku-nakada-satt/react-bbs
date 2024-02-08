import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./newThred.css";

function NewThred() {
  const url = "https://railway.bulletinboard.techtrain.dev/";
  const [thredTitle, setThredTitle] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setThredTitle(event.target.value);
    console.log(thredTitle);
  };

  const createThred = async () => {
    const data = {
      title: thredTitle,
    };
    const response = await fetch(`${url}/threads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      console.info("スレッドを作成しました");
      return;
    }
    console.error("スレッド作成に失敗しました");
  };

  return (
    <div className="App-body">
      <h1>スレッド新規作成</h1>
      <div className="content">
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
