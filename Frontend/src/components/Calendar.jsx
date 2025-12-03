
import React, { useEffect, useState } from 'react'
// import { Calendar as BigCalendar, dateFns } from 'react-big-calendar';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US'
import {Modal,Button} from 'react-bootstrap'

import 'react-big-calendar/lib/css/react-big-calendar.css';

const Calendar = () => {
    const [appointments,setAppointments]=useState([])
    const[view,setView]=useState('month')
    const[selectedEvent,setSelectedEvent]=useState(null)
    const[showModal,setShowModal]=useState(false)
    const locales={'en-US':enUS}
    const localizer= dateFnsLocalizer({format,parse,startOfWeek,getDay,locales})
    useEffect(()=>{
        fetchAppointments();


    },[])
const fetchAppointments=async()=>{
    try{
        const res=await fetch('/api/appointments')
        const data=await res.json()
        setAppointments(data)

    }
    catch(error){
        console.error(error);
    }
}
const categorizeAppointments=(appointments)=>{
    const today =moment();
    const appointmentDate=moment(appointments.start)
    if(appointmentDate.isBefore(today,'day')){
        return 'past';
    }
    else if(appointmentDate.isSame(today,'day')){
        return 'present'
    }else{
        return 'future'
    }
}
const eventStyleGetter=(event)=>{
    const category=categorizeAppointments(event);
    const backgroundcolor={
        past:'#gray',
        present:'#green',
        future:'#blue',
    } [category]
    return{
        style:{backgroundcolor}
    }
}
const handleEventClick=(event)=>{
    setSelectedEvent(event)
    setShowModal(false)
}
const AppointmentModal = () => (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {selectedEvent && (
                <div>
                    <p><strong>Patient:</strong> {selectedEvent.patient}</p>
                    <p><strong>Doctor:</strong> {selectedEvent.doctor}</p>
                    <p><strong>Date:</strong> {moment(selectedEvent.start).format('MMMM D, YYYY')}</p>
                    <p><strong>Time:</strong> {moment(selectedEvent.start).format('h:mm A')}</p>
                    <p><strong>Status:</strong> {categorizeAppointments(selectedEvent)}</p>
                </div>
            )}
        </Modal.Body>
    </Modal>
);
    return (
        <div className='calendar-header'>
                <h2>Appintment Calendar</h2>
                 <div className='canlendar-controls'>
                <div className='view-controls'>
                    <button onClick={() => setView('month')}>Month</button>
                    <button onClick={() => setView('month')}>Week</button>
                    <button onClick={() => setView('month')}>Day</button>
                </div>
            </div>

            <BigCalendar localizer={localizer}
                events={appointments}
                startAccessor="start"
                endAccessor='end'
                view={view}
                onview={setView}
                eventPropGetter={eventStyleGetter}
                views={['month', 'week', 'day']}
                style={{ height: 500 }} 
                onSelectEvent={handleEventClick}/>
                {AppointmentModal()}
        </div>

    )
}

export default Calendar;