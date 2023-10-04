
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Button,Form,Container,Modal } from 'react-bootstrap';
import Entry from './single-entry.component';
const Entries=()=>{
    const [entries,setEntries]=useState([]);
    const [RefreshData,setRefreshData]=useState(false);
    const [ChangeEntry,setChangeEntry]=useState({"change":false,"id":0});
    const [ChangeIngredient,setChangeIngredient]=useState({"change":false,"id":0});
    const [newIngredientName,setNewIngriedientName]=useState("");
    const[addNewEntry,setAddnewEntry]=useState(false);
    const[newEntry,setNewEntry]=useState({"dish":"","ingredients":"","calories":0,"fat":0});
    useEffect(()=>{
        getAllEntries();
    },[])
    if(RefreshData){
        getAllEntries();
        setRefreshData(false);
    }
    return(
        <div>
           <Container>
            <Button onClick={()=>setAddnewEntry(true)}>Track today's calories</Button>
           </Container>
           <Container>
            {entries !=null && entries.map((entry,index)=><Entry key={index} entryData={entry} setChangeIngredient={setChangeIngredient} deletesingleEntry={deletesingleEntry} setChangeEntry={setChangeEntry}/>)}
           </Container>
           <Modal show={addNewEntry} onHide={()=>setAddnewEntry(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Calorie Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Dish</Form.Label>
                        <Form.Control onChange={(event)=>newEntry.dish=event.target.value}/>  
                        <Form.Label>Ingredients</Form.Label>
                        <Form.Control onChange={(event)=>newEntry.ingredients=event.target.value}/>  
                        <Form.Label>Calories</Form.Label>
                        <Form.Control onChange={(event)=>newEntry.calories=event.target.value}/>
                        <Form.Label>Fat</Form.Label>
                        <Form.Control onChange={(event)=>newEntry.fat=event.target.value}/>               
                         </Form.Group>
                </Modal.Body>
                </Modal>
        </div>
    );
    function AddSingleEntry(){
        setAddnewEntry(false)
        var url = 'http://localhost:8000/entry/create';
        axios.post(url, {
            "dish": newEntry.dish,
            "ingredients": newEntry.ingredients,
            "calories": newEntry.calories,
            "fat": parseFloat(newEntry.fat)
        }).then(response=>{
            if(response.status == 200){
                setRefreshData(true)
            }
        })
    }
    function deletesingleEntry(id){
        var url = 'http://localhost:8000/entry/delete/'+id;
        axios.delete(url).then(response=>{
            if(response.status == 200){
                setRefreshData(true)
            }
        })
    }
    function getAllEntries(){
        var url = 'http://localhost:8000/entry/all';
        axios.get(url,{responseType:'json'}).then(response=>{
            if(response.status == 200){
                setEntries(response.data)
            }
        })
    }
}

export default entries.components
