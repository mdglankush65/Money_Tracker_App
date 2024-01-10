import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [datetime, setDateTime] = useState(new Date().toISOString().slice(0, 16));
  const [transactions,setTransactions]=useState([]);
  const [total,setTotal]=useState(0);
  const getTransactions=async()=>{
    const url= process.env.REACT_APP_API_URL+'/transactions';
    const response = await fetch(url);
    const res= await response.json();
    setTotal(res.reduce((acc, obj) => acc += parseFloat(obj.price),0));
    return res;
  }
  const addNewTransaction=async (e)=>{
    e.preventDefault();
    let price = name.split(' ')[0];
    if(isNaN(parseFloat(price))) price=0;
    const url = process.env.REACT_APP_API_URL +'/transaction';
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
    getTransactions().then(transaction => {
      setTransactions(transaction);
    });
  }
  useEffect(() => {
    getTransactions().then(transaction => {
      setTransactions(transaction);
    })
  }, []);
  return (
    <main>
      <h1>${total}</h1>
      <form onSubmit={() =>{
        if (name !== '' && description !== '' && datetime !== '') 
          addNewTransaction();
        }}>
        <div className='basic'>
          <input type="text" value={name} onChange={ev=>setName(ev.target.value)} placeholder={'+1000 L.G. 64" TV'} />
          <input type="datetime-local" value={datetime} onChange={ev=>setDateTime(ev.target.value)} />
        </div>
        <div className="description">
          <input type="description" value={description} onChange={ev=>setDescription(ev.target.value)} placeholder={'It is a new TV that we need'} />
        </div>
        <button>Add New Transaction</button>
      </form>
      {
        transactions?.map(transaction=>{
          return (
          <div className="transactions" key={transaction._id}>
            <div className='transaction'>
              <div className='left'>
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
              </div>
              <div className='right'>
                  <div className={`price ${transaction.price >= 0 ? "green" : "red"}`}>{transaction.price > 0 ? '+' : '-'}${Math.abs(transaction.price)}</div>
                  <div className="datetime">{transaction.datetime}</div>
              </div>
            </div>
          </div>);
        })
      }
    </main>
  );
}

export default App;
