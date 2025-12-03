import React from 'react'
import Header from '../components/Header'
import Doctorcard from '../components/Doctorcard'
import Banner from '../components/Banner'
import { useNavigate } from 'react-router-dom'
import DoctorGrid from '../components/DoctorGrid'
const Home = () => {
  const navigate = useNavigate();
  const goToSearchDoctors = () => {
    navigate('/search-doctors')
  }
  return (

    <div >
      <Header onButtonClick={goToSearchDoctors} />
      <Doctorcard onButtonClick={goToSearchDoctors} />
      <DoctorGrid onButtonClick={goToSearchDoctors} />
      <Banner onButtonClick={goToSearchDoctors} />
    </div>
  )
}

export default Home