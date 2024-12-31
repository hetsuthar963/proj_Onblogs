import { useState } from 'react'
import Appbar from '../components/Appbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export default function Publish() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // or any other method to get the token
  return (
    <div>
        <Appbar />
        <div className='flex justify-center'>

            <div className='max-w-screen-md w-full pt-8'>
                <label htmlFor="helper-text" className="block mb-2 text-xl font-medium text-gray-900">Your Blog</label>
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="eg: Tips to make 2025 a bang!" />
                {/* <label className='sr-only' /> */}
                <textarea onChange={(e) => {
                    setDescription(e.target.value)
                }} id="message" rows={12} className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." required />
                <div className='flex justify-end'>
                <button onClick={ async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content: description
                    },{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    navigate(`/blog/${response.data.id}`)

                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200">
                    Publish post
                </button>
                </div>
                
            </div>
            
            
        </div>
    </div>
  )
}

