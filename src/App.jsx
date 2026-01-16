import { useState } from 'react'
import './App.css'

function ListItem({children}){
  return <div className="list">{children}</div>
}

function App() {
  const [records, setRecords] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(parseInt(0));
  const [error, setError] = useState("");
  const [totalTime, setTotalTime] = useState(0);

  const handleInput = (e) => {
    const numOnly = e.target.value.replace(/[^0-9]/g, '');
    setTime(numOnly);
  }

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
        {records.map((record, index) => (
          <ListItem key={index}>{record.title} {record.time}時間</ListItem>
        ))}
        <ListItem><button onClick={() => {
        if (title && time) {
          setRecords([...records, { title, time}])
          setTitle("")
          setTime(0)
          setError("")
          setTotalTime(totalTime + parseInt(time))
        } else{
          setError("入力されていない項目があります")
        }} }>
          登録
        </button></ListItem>
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

export default App
