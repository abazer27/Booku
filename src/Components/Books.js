import React, { useState } from 'react'

export default function Books(data) {
  const [pinBook, setPinBook] = useState([])
  const getPinBook = (e) => {
    setPinBook(e)
    localStorage.setItem(pinBook.id, JSON.stringify(pinBook))
  }
  return (
    <div className='grid grid-cols-3 gap-4 mt-6'>
      {data.data.map((book) => (
        <div key={book.id} className="w-120 120 overflow-hidden flex flex-nowrap">
          <div>
            <img src={book.cover_url} alt={book.title} className='w-20 h-30' />
          </div>
          <div>
            <ul className='w-80 pl-5 leading-8'>
              <li>Title : <strong>{book.title}</strong></li>
              <li>Author : {book.authors}</li>
              <li className='leading-5 truncate'>Desciption : {book.description}</li>
              <li>
                <button type='button' onClick={() =>getPinBook(book)} className='bg-indigo-200 p-1 rounded'>
                  Save To Bookmark
                </button>
              </li>
            </ul>
          </div>

        </div>
      ))}
    </div>
  )
}
