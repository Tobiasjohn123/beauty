 import React from 'react'
 import Hero from './component/hero/hero'
 import Nav from './component/nav/nav'
 import Statement from './component/statement/statement'
 import Service from './component/service/servicesPreview'
 import Booking from './component/booking/booking'
 import About from './component/about/about'
 
 export default function App() {
   return (
     <div>
       <Nav />
       <Hero />
       <Statement /> 
        <Service />
       <Booking />
        <About />
     </div>
   )
 }
 