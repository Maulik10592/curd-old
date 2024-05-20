import React, { useState } from 'react';
import './App.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {PlusCircle, Edit, Trash2} from 'react-feather';

function App() {

  const blankUser = {
    "name" : "",
    "email" : "",
    "role" : "",
    "address" : ""
  } 
  
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(blankUser);
  const [userData, setUserData] = useState([]);
  const [action, setAction] = useState('Add');
  const [editIndex, setEditIndex] = useState(null);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction('Add');
  } 

  const addUser = () => {
    setUserData([...userData, user]);
    setUser(blankUser);
    onCloseModal();
  }

  const editUser = (index) => {
    setAction('Edit');
    const selectedUser = userData.find((x,i) => i === index);
    setUser(selectedUser);
    setEditIndex(index);
    onOpenModal();
  }

  const updateUser = () => {
    const newUsers =  userData.map((x,i) => {
      if(i === editIndex){
        x = user;
      }
      return x;
    });
    setUserData(newUsers);
    setUser(blankUser);
    setEditIndex(null);
    onCloseModal();
  }

  const deleteUser = (index) => {
    const newUSers = userData.filter((x,i) => {return i !== index});
    setUserData(newUSers);
  }

  return (
    <div className="container">
      <div className='d-flex'>
        <h1>CRUD APP</h1>
      </div>
      <div className='toolbar'>
        <button className='btn btn-p' onClick={onOpenModal}>
          <PlusCircle size={16}></PlusCircle>
          <span>add</span>
        </button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 && userData.map((user,index) => {
            return (
              <tr>
                <td data-th="Name">{user.name}</td>
                <td data-th="Email">{user.email}</td>
                <td data-th="Role">{user.role}</td>
                <td data-th="Address">{user.address}</td>
                <td data-th="Action">
                <button className='btn ml2' onClick={()=>editUser(index)}>
                  <Edit size={16}></Edit>
                  <span>Edit</span>
                </button>
                <button className='btn ml2' onClick={()=>deleteUser(index)}>
                  <Trash2 size={16}></Trash2>
                  <span>Delete</span>
                </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>{action} User</h2>
        <div className="form">
          <label htmlFor='name'>Name</label>
          <input type='text' value={user.name} onChange={(e) => setUser({...user,'name': e.target.value})} />
          <label htmlFor='name'>Email</label>
          <input type='email' value={user.email} onChange={(e) => setUser({...user,'email': e.target.value})} />
          <label htmlFor='name'>Role</label>
          <input type='text' value={user.role} onChange={(e) => setUser({...user,'role': e.target.value})} />        
          <label htmlFor='name'>Address</label>
          <textarea name='address' value={user.address} cols={30} rows={5} onChange={(e) => setUser({...user,'address': e.target.value})}></textarea>
          {action === 'Add' && <button className='btn' onClick={()=>addUser()}>Submit</button>}
          {action === 'Edit' && <button className='btn' onClick={()=>updateUser()}>Update</button>}
        </div>
      </Modal>
    </div>
  )
}

export default App;