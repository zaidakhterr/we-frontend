import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import instance from '../api';
import Editor from '../Components/Editor/Editor';

import { Tag } from "antd";

const DisplayQuestion = ({ item }) => {
  return (
  <div>
  <p>{item && item.question}</p>
  {item && <Editor value={JSON.parse(item.description)} readOnly ></Editor>}

   { item &&  
   (JSON.parse(item.tags)).map((tag, i) => (
    <Tag key={i} color="processing" closable={false}>
    {tag}
   </Tag>  
    ))} 
  </div> )
}

const Question = () => {
    
    const[item, setItem] = useState(null);

    const {id} = useParams();

    useEffect( () => {
      instance.get(`/question?id=${id}`).then(res => {
        setItem(res.data.result.question);
        // console.log(res)
        console.log((res.data.result.question));
        
      })
    }, [])

    return (

    //   <>
    //   <p>{item.question}</p>
    
    // <p>{(item.tags)}</p>
    // {/* <p>{item.description}</p> */}
    // </>

    <DisplayQuestion
    
    item = {item}
    ></DisplayQuestion>
      
    );

};



export default Question;










// console.log(res)
// const a = console.log(JSON.stringify(res))


//   function fetchQuestion () {
//     instance
//     .get(`/question?id=${id}`)
//     .then(res => {
//        setItem( res)
//      console.log('rij',JSON.parse(res.data.result.question));
//     }); 
    
// }

/* <p>{(item.description)}</p> */