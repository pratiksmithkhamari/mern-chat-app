import { AddCircle } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateGroup = () => {
  const [groupName,setGroupName] = useState('')
  const navigate = useNavigate()
  const userdata = JSON.parse(localStorage.getItem("userdata"))
  if(!userdata){
    navigate('/')
  }
  
    axios.post("http://localhost:3000/chat/createGroup",{
      name:groupName,
      users:""
    },{
      headers:{
        Authorization:`Bearer ${userdata.token}`
      }
    },
    navigate('app/groups')
  )
  
  
  return (
       <div className="border-t-2 bg-slate-300 flex items-center justify-center w-[70%] bg-opacity-30 dark:bg-zinc-900 dark:text-zinc-400">
        <div className='flex w-[70%] items-center shadow-xl rounded-xl p-3'>
        <input
        onClick={(e)=>{
          setGroupName(e.target.value)
        }}
          className="w-[60%] my-2 mx-6  rounded-xl p-3 outline-none "
          placeholder="Enter Group Name"
        />
        <div className="bg-blue-800 text-white rounded-full h-10 w-10 flex justify-center items-center">
          <IconButton
           sx={{ color: "white" }}>
            <AddCircle fontSize='medium'/>
          </IconButton>
        </div>
        </div>
      </div>
    
  )
}

export default CreateGroup
