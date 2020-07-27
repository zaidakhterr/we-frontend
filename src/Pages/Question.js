import "./DisplayQuestion.css";

import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { Tag } from "antd";
import moment from 'moment';

import instance from '../api';
import Editor from '../Components/Editor/Editor';

const DisplayQuestion = ({ item }) => {

  return (
    <div className="question-display">
      <h2>{item && item.question}</h2>
      <p>Asked {moment(item && item.updated_at).fromNow()}</p>
      {item && <Editor value={JSON.parse(item.description)} readOnly ></Editor>}
      <div className="question-display-tags">
      {item &&  (JSON.parse(item.tags)).map((tag, i) => (
        <Tag key={i} color="processing" closable={false} >{tag}</Tag>  
      ))} 
      </div>
    </div> )

}

const Question = () => {
    
    const[item, setItem] = useState(null);

    const {id} = useParams();

    useEffect( () => {
      instance.get(`/question?id=${id}`).then(res => {
        setItem(res.data.result.question);
        console.log((res.data.result.question));  
      })})

    return (

    <DisplayQuestion item = {item} > </DisplayQuestion>
      
    );

};

export default Question;










