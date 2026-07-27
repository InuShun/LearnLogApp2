import { useEffect, useState } from "react"
import { addRecords, deleteRecords, getAllRecords } from "./utils/supabaseFunctions";

export function LearnLog() {
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [error, setError] = useState("");
  
  const totalTime = records.reduce((sum, record) => sum + Number(record.time || 0), 0);

  const inputNumber = (e) => {
    const numOnly = e.target.value.replace(/[^0-9]/g, '');
    setTime(numOnly);
  }

  const handleSubmit = async (e) => {
    if (title && time) {
      e.preventDefault();
      await addRecords(title, time);

      setRecords([...records, { title, time}]);

      setTitle("")
      setTime(0)
      setError("")

    } else {
      setError("入力されていない項目があります")
    }         
  }

  const handleDelete = async (id) => {
    await deleteRecords(id);    

    setRecords(records => records.filter(records => records.id !== id));
  }

  useEffect(() => {
    const getRecords = async () => {
      setIsLoading(true);

      const records = await getAllRecords();
      setRecords(records);

      setIsLoading(false);
    };
    getRecords();
  }, []);

  return (
    isLoading ? (<div>ロード中．．．</div>) : 
    <>   
      <h1>学習記録一覧</h1>
      <ul>
        {/*学習記録を入力*/}
        <div>
          <label htmlFor="title">学習内容</label>          
          <input type="text" id="title"  value={title} onChange={e => setTitle(e.target.value)}/>         
        </div>
        <div>
          <label htmlFor="time">学習時間</label>
          <input type="number" id="time" value={time} onChange={inputNumber}/>時間          
        </div>
        <div>入力されている学習内容：{title}</div>
        <div>入力されている学習時間：{time}時間</div>
        {/*学習記録を表示*/}
        {records.map((record) => (
          <li key={record.id}>
            {record.title} {record.time}時間<button onClick={() => handleDelete(record.id)}>削除</button>
          </li>
        ))}
        <button onClick={(e) => handleSubmit(e)}>登録</button>
        <div>{error}</div>
        <div>合計時間：{totalTime}/1000(h)</div>
      </ul>
    </>
  )
}
