import React, {useEffect, useState} from 'react';
import { get } from './utils'
import './App.css';
import axios from 'axios';

const url = `https://pokeapi.co/api/v2/pokemon`;

const App = ()=>{
    const [State, setState] = useState(null)
    
    useEffect(async()=>{
      const list = await axios.get(url).then(response=>response.data).catch(e=>alert(e.message));
      setState(list);
    }, []);

    const NEXT = async()=>{
      if(State.next){
        const list = await axios.get(State.next).then(response=>response.data).catch(e=>alert(e.message));
        setState(list);
      }
    };

    const PREV = async()=>{
      if(State.previous){
        const list = await axios.get(State.previous).then(response=>response.data).catch(e=>alert(e.message));
        setState(list);
      }
    };
    
    return (
      <div className="main">
        <div className="classmain">
          <ul>
            {
              (!State)? <div>Loading list...</div> 
              :
              State.results.map((item)=>{
                return (
                <li>{item.name}</li>
                )
              })
            }
          </ul>
        </div>
        <div className="buttons">
          <button onClick={()=>PREV()}>Previous</button>
          <button onClick={()=>NEXT()}>Next</button>
        </div>
      </div>
    )
}

export default App;
