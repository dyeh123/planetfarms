import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { listCommunities, searchCommunities, createCommunity, listUserCommunities, searchUserCommunities } from "../../actions/CommunityActions";
import Button from "../../Components/Button/Button";
import CommunitiesCard from "../../Components/communitiesCard/CommunitiesCard";
import DragDrop from "../../Components/DragDrop/DragDrop";
import Filter from "../../Components/Filter/Filter";
import InputComponent from "../../Components/Input/InputComponent";
import CollectionModalHeader from "../../Components/NewsCreateModal/CollectionModalHeader";
import SearchComponent from "../../Components/SearchComponent/SearchComponent";
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import useSizeFinder from "../../utils/SizeFinder";
import "./community-switching.css";

const communityData = [
  {
    _id: 1,
    title: "Australian farmers community",
    followers: " 10 376 followers",
    bgImage: '/img/bg-image2.svg',
  },

  {
    _id: 2,

    title: "Europe and Australian framers community",
    followers: " 10 476 followers",
    bgImage: "/img/Card-2.svg",
  },
  {
    _id: 3,
    title: "Asian and African framers community",
    followers: " 11 476 followers",
    bgImage: "/img/Card-1.svg",
  },
  {
    _id: 4,
    title: "Indian and Nepali framers community",
    followers: " 15 476 followers",
    bgImage: "/img/Card-2.svg",
  },
  {
    _id: 5,
    title: "Australian farmers community",
    followers: " 10 376 followers",
    bgImage: "/img/Card-1.svg",
  },
  {
    _id: 6,
    title: "Europe and Australian framers community",
    followers: " 10 476 followers",
    bgImage: "/img/Card-1.svg",
  },
];
const nav = [{
  label: 'All Communities',
  link: '/community-switching'
}, {
  label: 'My Communities',
  link: '/community-switching/my-communities'
}]

function App() {
  const[modalActive, setModalActive] = useState(false);
  return (
    <>
    {modalActive && <CommunityModal setActive={setModalActive} />}
    <DashboardLayout title="All Communities">
      <AllCommunities setModalActive={setModalActive} />
    </DashboardLayout>
    </>
  );
}

export default App;

function AllCommunities ({setModalActive}) {
  const {pathname} = useLocation();
  const [search, setSearch] = useState(null)

   const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const communitiesState = useSelector((state) => state.listCommunities);
  const {error, loading, communities} = communitiesState
  
  const userCommunitiesState = useSelector((state) => state.listUserCommunities);
  const {error:user_com_error, loading:user_com_loading, userCommunities} = userCommunitiesState
  //create community
  const createCommunity = useSelector((state) => state.addCommunity);
  const {success:createSuccess} = createCommunity
  const dispatch = useDispatch()
  let userId = 24;
  useEffect(() => {
        if(!search) dispatch(listCommunities());
        if(search) dispatch(searchCommunities(search));

        if(pathname==='/community-switching/my-communities') {
          if(!search) dispatch(listUserCommunities(userId))
          if(search) dispatch(searchUserCommunities(userId, search));
        }
  }, [search, dispatch, createSuccess, pathname]);

  return (
    <>
        <CommunityHeader setActive={setModalActive} search={search} setSearch={setSearch} />
        {
          pathname==='/community-switching/my-communities' 
          ? <CommunitiesCard data={userCommunities} />
          : <CommunitiesCard data={communities} />
        }
         
    </>)  
}

const CommunityHeader = ({setActive, search, setSearch}) => {
  const { pathname } = useLocation()
  const history = useHistory()
  const windowWidth = useSizeFinder();
  
  return (
    <div className='library-main-header-container'>
      <div className='library-container'>
        {windowWidth > 839
          ? <>
            <ul className='library-list-container'>
              {nav.map((menu) => (
                <li>
                  <Link className={`nav-link ${(pathname === menu.link) ? 'library-list-item active' : 'library-list-item'}`} to={menu.link}>{menu.label}</Link>
                </li>
              ))}
            </ul>
            <SearchComponent search={search} setSearch={setSearch} className='search-btn margin-0' />
          </>
          : <>
            <Filter data={nav} newFilter='new' />
            <SearchComponent search={search} setSearch={setSearch} className='search search-btn margin-0' />
            </>}
      </div>
      <div className='library-sub-header'>
        <div className='library-sub-header-1'>
          <div className='library-btn-container'><button className='default-btn' onClick={() => setActive(true)}>Create Community</button></div>
        </div>
        <div className='library-sub-header-2'>
          <Filter />
        </div>
      </div>
    </div>
  )
}

const CommunityModal = ({setActive}) => {
  const [files, setFiles] = useState();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [userId, setUserId] = useState(0);
  const dispatch = useDispatch()
  
  function addCommunity () {
    dispatch(createCommunity({files, name, desc, userId}))
    setActive(false);
  }
  
  return(
    <div className='collection-modal-container'>
        <div>
          <div className='collection-modal-inner-container'>
            <CollectionModalHeader title='Create Community' clickHandler={setActive} />
            <DragDrop files={files} onChange={setFiles} />
            <InputComponent name="Community Name" text={name} changeHandler={setName} />
            <InputComponent name="Description" text={desc} changeHandler={setDesc} />
            <InputComponent name="User Id" text={userId} changeHandler={setUserId} />
             <Button name="Create Community" clickHandler={addCommunity} />
          </div>
        </div>
      </div>
  )
};