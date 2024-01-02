import './App.css';
import { useState } from 'react';

function App() {
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [datetime,setDateTime]=useState('');
  const addNewTransaction=(e)=>{
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/transaction';
    fetch(url,{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({name,description,datetime})
    }).then(response=>
      response.json().then(res=>{
        console.log("res ",res)})
    )
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
      <div className="transactions">
        <div className='transaction'>
          <div className='left'>
            <div className="name">L.G. TV</div>
            <div className="description">I need a new TV.</div>
          </div>
          <div className='right'>
            <div className="price red">-$300</div>
            <div className="datetime">2-1-24 3:17</div>
          </div>
        </div>
        <div className='transaction'>
          <div className='left'>
            <div className="name">L.G. TV</div>
            <div className="description">I need a new TV.</div>
          </div>
          <div className='right'>
            <div className="price green">+$300</div>
            <div className="datetime">2-1-24 3:17</div>
          </div>
        </div>
        <div className='transaction'>
          <div className='left'>
            <div className="name">L.G. TV</div>
            <div className="description">I need a new TV.</div>
          </div>
          <div className='right'>
            <div className="price green">+$300</div>
            <div className="datetime">2-1-24 3:17</div>
          </div>
        </div>
        <div className='transaction'>
          <div className='left'>
            <div className="name">L.G. TV</div>
            <div className="description">I need a new TV.</div>
          </div>
          <div className='right'>
            <div className="price red">-$300</div>
            <div className="datetime">2-1-24 3:17</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
