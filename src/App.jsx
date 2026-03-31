import { useEffect, useState } from "react"
import { addRecords, deleteRecords, getAllRecords } from "./utils/supabaseFunctions";
import "./App.css"
import { Loading } from "./component/Loading";

function ListItem({children}){
  return <div className="list">{children}</div>
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(parseInt(0));
  const [error, setError] = useState("");
  const [totalTime, setTotalTime] = useState(0);

  const handleInput = (e) => {
    const numOnly = e.target.value.replace(/[^0-9]/g, '');
    setTime(numOnly);
  }

  useEffect(() => {
    const getRecords = async () => {
      setIsLoading(true);

      const records = await getAllRecords();
      setRecords(records);

      const total = records.reduce((sum, record) => sum + parseInt(record.time || 0), 0);
      setTotalTime(total);

      setIsLoading(false);
    };
    getRecords();
  }, []);

  const handleSubmit = async (e) => {
    if (title && time) {
      e.preventDefault();
      await addRecords(title, time);

      setTitle("")
      setTime(0)
      setError("")
      
      const total = records.reduce((sum, record) => sum + parseInt(record.time || 0), 0);
      setTotalTime(total);

      const records = await getAllRecords();
      setRecords(records);

    } else{
      setError("入力されていない項目があります")
    }         
  }

  const handleDelete = async (id) => {
    await deleteRecords(id);

    const records = await getAllRecords();
    setRecords(records);
  }

  if (isLoading) { 
    return <Loading/>   
  }   
  else {
    return (
    <>     
      <h1>学習記録一覧</h1>
      <ul>
        <ListItem>
          学習内容<input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
        </ListItem>
        <ListItem>
          学習時間<input type="number" value={time} onChange={handleInput}/>時間
        </ListItem>
        <ListItem>入力されている学習内容：<label>{title}</label></ListItem>
        <ListItem>入力されている学習時間：<label>{time}</label>時間</ListItem> 

        {/*学習記録を表示*/}
        {records.map((record) => (
          <div key={record.id}>
            <ListItem><label>{record.title} {record.time}時間</label><button onClick={() => handleDelete(record.id)}>削除</button></ListItem>
          </div>
        ))}

        <ListItem><button onClick={(e) => handleSubmit(e)}>登録</button></ListItem>
       
        {error && (
          <ListItem>
            {error}
          </ListItem>
        )}
        <ListItem>合計時間：{totalTime}/1000(h)</ListItem>
      </ul>    
    </>
    )
  }  
}

export default App
