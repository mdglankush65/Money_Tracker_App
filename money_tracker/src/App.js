import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [datetime,setDateTime]=useState('');
  const [transactions,setTransactions]=useState([]);
  useEffect(()=>{
    getTransactions().then(transaction=>{
      // console.log(transaction);
      setTransactions(transaction);
    })
  },[]);
  const getTransactions=async()=>{
    const url= process.env.REACT_APP_API_URL+'/transactions';
    const response = await fetch(url);
    return await response.json();
  }
  const addNewTransaction=async (e)=>{
    e.preventDefault();
    const price = name.split(' ')[0];
    const url = process.env.REACT_APP_API_URL +'/transaction';
    // console.log(name,price,description,datetime);
    await fetch(url,{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({
        name:name.substring(price.length+1),
        price,
        description,
        datetime
      })
    }).then(response=>
      response.json().then(res=>{
        console.log("res ",res)})
    );
    setName('');
    setDateTime('');
    setDescription('');
  }
  return (
    <main>
      <h1>$400.00</h1>
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input type="text" value={name} onChange={ev=>setName(ev.target.value)} placeholder={'L.G. 64" TV'} />
          <input type="datetime-local" value={datetime} onChange={ev=>setDateTime(ev.target.value)} />
        </div>
        <div className="description">
          <input type="description" value={description} onChange={ev=>setDescription(ev.target.value)} placeholder={'It is a new TV that we need'} />
        </div>
        <button>Add New Transaction</button>
      </form>
      {
        transactions?.map(tran=>{
          return (
          <div className="transactions" key={tran._id}>
            <div className='transaction'>
              <div className='left'>
                <div className="name">{tran.name}</div>
                <div className="description">{tran.description}</div>
              </div>
              <div className='right'>
                <div className={`price ${tran.price>0?"green":"red"}`}>{tran.price>0?'+':'-'}${Math.abs(tran.price)}</div>
                <div className="datetime">{tran.datetime}</div>
              </div>
            </div>
          </div>);
        })
      }
    </main>
  );
}

export default App;
