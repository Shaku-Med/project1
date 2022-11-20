import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import Linkify from 'react-linkify'

function Preview({socket}) {

    const [datainfo, setdatainfo] = useState('')
    const [setholdcu, holdcu] = useState('')
    let {id} = useParams()

    const [onlines, setonline] = useState([])

    useEffect(() => { 
        axios.post("http://localhost:3001/all/user/profile", { 
            uuid: id
        }).then(res => { 
            if(res.data !== "error"){ 
                res.data.map((val) => { 
                    setdatainfo(val)
                    localStorage.setItem("vak", val.email)

                    // 


                    



                    // 


                    socket.emit("join_now", id)
                    socket.emit("owner_join", id)
                        if(document.visibilityState === "visible"){ 
                            socket.emit("online_tell", { 
                                uuid: id,
                                stat: "online"
                            })
                        }
                        else { 
                            socket.emit("online_tell", { 
                                uuid: id,
                                stat: "offline"
                            })
                        }
                })
            }
            else{ 
                Cookies.remove("c_user")
                localStorage.clear()
            }
        })
    }, [id])


 
    socket.on("onlinestat", data => { 
        setonline(data)
    })




    const [acu, acusers] = useState('')

    useEffect(() => { 
        axios.post("http://localhost:3001/all/user/owner", { 
            uuid: Cookies.get("c_user")
        }).then(res => { 
            if(res.data !== "error"){ 
               res.data.map((val => { 
                acusers(val)
               }))
            }
            else{ 
                Cookies.remove("c_user")
                localStorage.clear()
            }
        })

    }, [])


    // Grabbing chat messages

    const [chatme, setchatme] = useState([])
    useEffect(() => { 
        
        axios.post("http://localhost:3001/messages/chat/me", { 
            uuid: Cookies.get('c_user')
        }).then(res => { 
            setchatme(res.data)
        })

    }, [id])



  return (
    <div>
        { 
          [datainfo].map((vak, kav) => { 
            if(vak.unic_id !== Cookies.get("c_user")){ 

                socket.on("messages", data => { 
                    let scrolling = document.querySelector("#scrolling")
                    let displayer = document.querySelector("#displayer")
                    if(data.sendersemail === acu.email && data.receiversemail === vak.email || data.sendersemail === vak.email && data.receiversemail === acu.email )
                     { 
                        if(data.ownerid === Cookies.get("c_user") || data.sendersid === Cookies.get("c_user")){ 
                            if(data.sendersid === Cookies.get("c_user")){ 
              
              
                              let messages_s = data.message_sent.replace(/</g, "&lt;").replace(/>/g, "&gt;")
              
                              let htm = `
                              <Linkify>
                              <li class="flex justify-end">
                              <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                                  <span class="block">${messages_s}</span>
                              </div>
                              </li>
                              </Linkify>
                              `
              
                              displayer.innerHTML += htm;
              
                              scrolling.scrollTo(10, scrolling.scrollHeight)
                              
                            }
                            else { 
              
                              let messages_s = data.message_sent.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                              let htm = `
                              <Linkify>
                              <li class="flex justify-start">
                              <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                                  <span class="block">${messages_s}</span>
                              </div>
                              </li>
                                </Linkify>
                              `
              
                              displayer.innerHTML += htm

                              scrolling.scrollTo(10, scrolling.scrollHeight)
              
                            }
                          }
                     }
                })

                return ( 
                    <div key={kav} id='cols' className=" col-span-2">
                        <div className="w-full">
                            <Link to={"../profile/user/" + vak.pageid} className="relative cursor-pointer  flex items-center p-3 border-b border-gray-300" style={{width: "100%"}}>
                            <img className="object-cover w-10 h-10 rounded-full"
                                src={vak.profilepic} alt="username" />
                            <span className="block ml-2 font-bold text-gray-600">{vak.fname}</span>
                            { 
                            [onlines].map((val, key) => { 
                                if(val.stat === "online"){ 
                                    return ( 
                                        <span key={key} className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                                        </span>
                                    )
                                }
                            })
                            }
                            </Link>
                            <div className="relative w-full p-6 overflow-y-auto h-[38rem]">
                            <ul className="space-y-2" id='scrolling'>
                                { 
                                  chatme.map((data, k) => { 
                                    if(data.sendersemail === acu.email && data.receiversemail === vak.email || data.sendersemail === vak.email && data.receiversemail === acu.email )
                                     { 
                                        if(data.ownerid === Cookies.get("c_user") || data.sendersid === Cookies.get("c_user")){ 
                                            if(data.sendersid === Cookies.get("c_user")){
                                                return ( 
                                                    <Linkify>
                                                    <li className="flex justify-end">
                                                    <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                                                        <span className="block">{data.message_sent}</span>
                                                    </div>
                                                    </li>
                                                    </Linkify>
                                                )
                                             }
                                             else { 
                                                return ( 
                                                <Linkify>
                                                    <li className="flex justify-start">
                                                    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                                                        <span className="block">{data.message_sent}</span>
                                                    </div>
                                                    </li>
                                                </Linkify>
                                                )
                                             }
                                        }
                                     }
                                  })
                                }
                                <div className="hidden_displayer space-y-2" id='displayer'>
                                </div>
                            </ul>
                            </div>

                            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300 ouinput">
                            
                           

                            <input  onFocus={e => { 
                                let messagebox = document.querySelector("#messagebox")
                                messagebox.addEventListener("keydown", e => { 
                                    if(e.key === "Enter"){ 
                                        if(e.target.value !== ""){ 
                                          if(acu.unic_id === Cookies.get('c_user')){ 
                                            let vals = e.target.value.replace(/\//g, '/')
                                            
                                            let arr = { 
                                                ownerid: vak.unic_id,
                                                sendersid: acu.unic_id,
                                                message_type: "text",
                                                message_sent: vals,
                                                messageid: uuidv4(),
                                                sendersemail: acu.email,
                                                receiversemail: vak.email
                                            }
                                            socket.emit("chat_message", arr)
                                            e.target.value = ""
                                            
                                           
                                          }
                                        }
                                    }
                                })
                            }} type="text" placeholder="Message"
                                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                                name="message" required id='messagebox' />
                            
                            <button onClick={e => { 
                                let messagebox = document.querySelector("#messagebox")
                                if(messagebox.value !== ""){ 
                                    if(acu.unic_id === Cookies.get('c_user')){ 
                                        let vals = messagebox.value.replace(/\//g, '/')

                                      let arr = { 
                                          ownerid: vak.unic_id,
                                          sendersid: acu.unic_id,
                                          message_type: "text",
                                          message_sent: vals,
                                          messageid: uuidv4(),
                                          sendersemail: acu.email,
                                          receiversemail: vak.email
                                      }
                                      socket.emit("chat_message", arr)
                                      messagebox.value = ""
                                    }
                                  }
                            }} type="submit">
                                <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                            </div>
                        </div>
                        </div>
                )
            }
            else { 
                return ( 
                    <div key={kav} className="text-center h-full bg-black w-full text-white font-extrabold flex items-center justify-center" style={{height: '100vh'}}>
                        <h1 className="text-center">
                            You can't chat with your self.
                        </h1>
                    </div>
                )
            }
          })
        }
    </div>
  )
}

export default Preview
