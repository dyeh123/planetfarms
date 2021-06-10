import React from 'react'
<<<<<<< HEAD
import './LibraryCard.css'
=======
import CardLayout from '../../Layout/cardLayout/CardLayout'
import './library-card.css'
>>>>>>> 54dc657... rename

const LibraryCard = ({ data }) => {
  return (
    <>
<<<<<<< HEAD
      <div className='libraryCard-main-container'>
        {
             data.map(item => {
               return (
                 <div
                   key={item.title} className='libraryCard-inner-container' style={{
                     backgroundImage: `url(${item.img})`,
                     backgroundPosition: 'center',
                     backgroundSize: 'cover',
                     backgroundRepeat: 'no-repeat'
                   }}
                 >

                   <button className='trasnsparent-btn positioning'><img src='/img/trash-outline.svg' alt='trash-icon' /> <span>Remove from library</span></button>
                   <div className='libraryCard-content'>
                     <h6>{item.category}</h6>
                     <h4>{item.title}</h4>
                   </div>
=======
      <CardLayout data={data}>
        {
             data.map(item => {
               return (
                 <div>
                   <LibraryBackgroundCard item={item} />
>>>>>>> 54dc657... rename
                 </div>
               )
             })
         }
<<<<<<< HEAD
      </div>
=======
      </CardLayout>
>>>>>>> 54dc657... rename
    </>
  )
}

<<<<<<< HEAD
=======
const LibraryBackgroundCard = ({ item }) => {
  return (
    <div
      key={item.title} className='libraryCard-inner-container' style={{
        backgroundImage: `url(${item.img})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div>
        <div className='my-library-btn-container'>
          <button className='trasnsparent-btn'><img src='/img/trash-outline.svg' alt='trash-icon' /> <span>Remove from library</span></button>
        </div>
        <div className='libraryCard-content'>
          <h6>{item.category}</h6>
          <h5>{item.title}</h5>
        </div>
      </div>
    </div>
  )
}

>>>>>>> 54dc657... rename
export default LibraryCard
