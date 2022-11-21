import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'


function Home() {

    const [datainfo, setdatainfo] = useState('')

    useEffect(() => { 
        axios.post("https://project1backend.badzybaddest.repl.co/all/user/owner", { 
            uuid: Cookies.get("c_user")
        }).then(res => { 
            if(res.data !== "error"){ 
                setdatainfo(res.data)
            }
            else{ 
                Cookies.remove("c_user")
                localStorage.clear()
            }
        })
    }, [])


    const [chatme, setchatme] = useState([])
    useEffect(() => { 
        
        axios.post("https://project1backend.badzybaddest.repl.co/messages/chat/grabs_all", { 
            uuid: Cookies.get('c_user')
        }).then(res => { 
            setchatme(res.data)
        })

    }, [])

  return (
    <div>
<section className="flex  justify-center antialiased  text-gray-600 min-h-screen ">
    <div className="h-full">
        <div className="relative  outchats bg-white shadow-lg">
            <header className="pt-6 pb-4 px-3 border-b border-gray-200">
                <div className="flex justify-between items-center mb-3">
                    { 
                         datainfo === '' ? "Loading..." : 
                         datainfo.map((val, key) => { 
                            if(val.unic_id === Cookies.get('c_user')){ 
                                return ( 
                                  <div key={key} className="flex items-center">
                                   <Link to={"../profile/user/" + val.pageid} className="inline-flex items-start mr-3" href="#0">
                                          <img className="rounded-full object-cover h-11 w-11 object-center" src={val.profilepic} width="48" height="48" alt="Lauren Marsano" />
                                      </Link>
                                      <div className="pr-1">
                                          <Link to={"../profile/user/" + val.pageid} className="inline-flex text-gray-800 hover:text-gray-900" href="#0">
                                              <h2 className="text-xl leading-snug font-bold">{val.fname}</h2>
                                          </Link>
                                          <Link to={"../profile/user/" + val.pageid} className="block text-sm font-medium hover:text-indigo-500" href="#0">{val.email}</Link>
                                      </div>

                                      
                                 </div>
                              )
                          }
                        })
                    }
                </div>
                
                
            </header>
            <div className="py-3 px-3 ">
                <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">Chats</h3>
                <div className="divide-y divide-gray-200 overscrollme">

                   { 
                      chatme.map((val, key) => { 
                        if(val.unic_id !== Cookies.get('c_user')){ 
                            return ( 
                                <Link style={{color: 'gray'}} to={"../preview/view/" + val.pageid}>
                                    <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                                        <div className="flex items-center">
                                            <img className="rounded-full items-start flex-shrink-0 mr-3" src={val.profilepic} style={{width: "35px", height: '35px', objectFit: 'cover'}} alt="Marie Zulfikar" />
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900">{val.fname}</h4>                                            </div>
                                        </div>
                                    </button>
                                </Link>
                            )
                        }
                      })
                   }
                </div>
            </div>
        </div>
    </div>
</section>
    </div>
  )
}

export default Home
