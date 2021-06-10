import { useState } from 'react'
<<<<<<< HEAD
import './UserCollection.css'

import LibraryHeader from '../../../Components/libraryHeader/LibraryHeader'
=======
import './user-collection.css'

import LibraryHeader from '../../../Components/LibraryHeader/LibraryHeader'
>>>>>>> 54dc657... rename
import DashboardLayout from '../../../Layout/DashboardLayout/DashboardLayout'
import CollectionModal from '../../../Components/CollectionModal/CollectionModal'
import SimpleModal from '../../../Components/SimpleModal/SimpleModal'
import { farming, groupCollection } from '../CollectionData'
import GroupModal from '../../../Components/GroupModal/GroupModal'
<<<<<<< HEAD
=======
import CardLayout from '../../../Layout/cardLayout/CardLayout'
>>>>>>> 54dc657... rename

const UserCollection = () => {
  const [active, setActive] = useState(false)
  const [modalActive, setModalActive] = useState(false)

  const [groupModal, setGroupModal] = useState(false)
  const [newCollection, setNewCollection] = useState(false)

  function openAddCollection () {
    setGroupModal(true)
    setModalActive(false)
  }

  return (
    <>
      {groupModal && <GroupModal
        clickHandler={setGroupModal}
        data={groupCollection} btnName='add to collections'
        setNewCollection={setNewCollection}
                     />}

      {modalActive && <CollectionModal setActive={setModalActive} openAddCollection={openAddCollection} />}

      {newCollection && <SimpleModal setNewCollection={setNewCollection} />}

      <DashboardLayout title='library'>
        <div className='library-main-container'>
          <LibraryHeader setActive={setModalActive} />
        </div>

        <h4 className='farming-collection-header'>Farming Collections</h4>
<<<<<<< HEAD
        <div className='farming-main-container'>

          {
                farming.map(item => {
                  return (
                    <div className='farming-inner-container' style={{ backgroundImage: `url(${item.img})` }}>
=======

        <CardLayout data={farming}>
          {
                farming.map(item => {
                  return (
                    <div
                      className='farming-inner-container'
                      style={{
                        background: `linear-gradient(359.99deg, #000000 0.01%, rgba(25, 28, 33, 0.4) 99.99%), url(${item.img})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
>>>>>>> 54dc657... rename
                      <button className='trasnsparent-btn btn-positioning'>
                        <b>{item.users}</b>  <span>users saved</span>
                      </button>

                      <div className='libraryCard-content'>
                        <h6>{item.category}</h6>
                        <h4>{item.title}</h4>

                        <button className='trasnsparent-btn fixed-width' onClick={() => setActive(!active)}>
                          {active ? <><img src='/img/check-circle.svg' alt='circle-icon' /> <span>Saved</span></> : 'Save Collection'}
                        </button>
                      </div>
                    </div>
                  )
                })
            }
<<<<<<< HEAD
        </div>
=======
        </CardLayout>
>>>>>>> 54dc657... rename
      </DashboardLayout>
    </>
  )
}

export default UserCollection
