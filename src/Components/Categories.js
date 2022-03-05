import React, { useState } from 'react'
import Books from './Books'
import axios from 'axios';

export default function Categories(categories) {
  const [books, setBooks] = useState([])
  const [open, setOpen] = useState('')
  const [id, setId] = useState(null)
  const [filterBook, setFilterBook] = useState([])
  const [value, setValue]= useState('')
  const keys = Object.keys(localStorage)
  let datas = []
  const getBooks = (props) => {
    setBooks([])
    setId(null)
    setId(props)
    setOpen(props)
    axios.get(`/fee-assessment-books`, {
      params: {
        categoryId: props,
        page: 0,
        size: 10
      }
    })
      .then(response => {
        setBooks(response.data)
      })
      .catch(error => {
        console.log(error.response)
      });
  }
  const getBook = (e) => {
    setValue(e.target.value.toLowerCase()) 
    let book = books.filter((bk) => {
      let searchValue = bk.title.toLowerCase();
      searchValue += bk.authors[0].toLowerCase();
      return searchValue.indexOf(value) !== -1
    })
    setFilterBook(book)
  }
  const getBookmark = () =>{
    for(let i = 0; i < keys.length; i++){
      let bookmark = localStorage.getItem(keys[i]);
      bookmark = datas.push(JSON.parse(bookmark))
      setBooks(datas)
    }
  }
  return (
    <div className='ml-6 mr-6'>
      <div className='flex flex-nowrap justify-center'>
        {categories.categories.map((data) => (
          <div key={data.id} onClick={() => getBooks(data.id)}>
              <button className="text-base text-stone-700 bg-indigo-200 mt-8 mr-5 p-2 rounded cursor-pointer hover:bg-indigo-300 active:bg-indigo-300 focus:bg-indigo-300">
                {data.name}  
              </button>
          </div>
        ))}
        <button onClick={() =>getBookmark()} className="text-base text-stone-700 bg-indigo-200 mt-8 mr-5 p-2 rounded cursor-pointer hover:bg-indigo-300 active:bg-indigo-300 focus:bg-indigo-300">
          Bookmark
        </button>
      </div>
      {open === id ? (
        <div>
          <div className='flex flex-nowrap justify-end mt-8'>
            <input type="text" onChange={(e)=>getBook(e)} placeholder=' search...' className='border-2 rounded border-stone-800'></input>
          </div>
          {value.length > 0 ? (
            <Books data={filterBook}/>
          ): 
            <Books data={books}/>}
        </div>
      ):null}
    </div>
  )
}
