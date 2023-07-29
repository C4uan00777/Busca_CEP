/* eslint-disable jsx-a11y/alt-text */

import React,{ useState } from 'react';
import image from './andando.gif'
import {FiSearch} from 'react-icons/fi'
import './styles.css'
import api from './services/api'

function App() {

  const [input, setInput] = useState('');
  const [cep,setCep] = useState({});
  

  async function mudaInput(){
    if(input === ''){
      alert("Preencha o CEP")
      return;
    }

    try{
    const response = await api.get(`${input}/json`)
    setCep(response.data)
    setInput("");

    }
    catch{
      alert('Erro na busca...')
      setInput("")

    }
   
  }



  return (
    <div className="container">

   <h1 className="title">  Busca CEP</h1>

   <img src={image} alt={image} className='andando'></img>

   <div className="containerInput">
    <input type="text" placeholder="digite seu CEP:" 
    value={input} 
    onChange={(e) => setInput(e.target.value)}></input>
    

    <button className="Search" onClick={mudaInput}>
     <FiSearch size={25} color='black'/>
    </button>
     </div>

{Object.keys(cep).length > 0 && (
     <main className='main'>
     <h2> CEP: {cep.cep}</h2>
 
     <span>{cep.logradouro}</span>
     <span>Complemento: {cep.complemento}</span>
     <span>{cep.bairro}</span>
     <span>{cep.localidade} - {cep.uf}</span>
 
 
    </main>
)}

    </div>
  );
}

export default App;
