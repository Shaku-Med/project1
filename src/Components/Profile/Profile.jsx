import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import {motion} from 'framer-motion'


function Profile() {

    const [datainfo, setdatainfo] = useState([])
    let {id} = useParams()

    useEffect(() => { 
        axios.post("https://ournodes.herokuapp.com/all/user/profile", { 
            uuid: id
        }).then(res => { 
            if(res.data !== "error"){ 
                setdatainfo(res.data)
            }
            else{ 
                Cookies.remove("c_user")
                localStorage.clear()
            }
        })
    }, [id])

  return (
    <div>
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"/>
<link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"/>

<main  className="profile-page overflow-auto" style={{height: '100vh'}}>

  { 

     datainfo ===  null ? <div className='animation-bounce fa fa-spinner'></div> :
     
    datainfo.map((val, key) => { 
        if(val.unic_id === Cookies.get("c_user")){ 
            return ( 
                <div key={key}>
                    <section className="relative block h-500-px">
    
                        <input accept='image/*' onChange={e => { 
                            let oubg = document.querySelector("#oubg")
                            let file = e.target.files[0]
                            if(file){ 
                                let reader = new FileReader()
                                reader.onload = (e) => { 
                                    let result = reader.result
                                    oubg.style.backgroundImage = `url(${result})`
                                }
                                reader.readAsDataURL(file)
                            }

                            let arr = { 
                                uuid: Cookies.get("c_user"),
                               flee: file
                            }
                            axios.post("https://ournodes.herokuapp.com/upload/coverpic/now", arr,  { 
                                headers: { 
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then(res => { 
                                oubg.style.backgroundImage = `url(${res.data})`
                            })

                        }} type="file"  id="coverpic" className="d-none" />
                        <motion.label drag="x" dragConstraints={{left: 5, right: 5}} className="absolute cursor-pointer top-0 w-full h-full bg-center bg-cover" id='oubg' style={{backgroundImage: `url(${val.coverpic})`}} htmlFor="coverpic">
                            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                        </motion.label>
                        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: 'translateZ(0px)'}}>
                        <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                        </div>
                    </section>
                    <motion.section drag dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}} draggable={{top: 1}} className="relative py-16 bg-blueGray-200">
                        <div drag className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="w-full overflow-hidden rounded-md">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full text-center">
                                    <input accept='image/*'  onChange={e => { 
                                        let sociao = document.querySelector("#sociao")
                                        let file = e.target.files[0]
                                        if(file){ 
                                            let reader = new FileReader()
                                            reader.onload = (e) => { 
                                                let result = reader.result
                                                sociao.src = result
                                            }
                                            reader.readAsDataURL(file)


                                            let arr = { 
                                                uuid: Cookies.get("c_user"),
                                               flee: file
                                            }
                                            axios.post("https://ournodes.herokuapp.com/upload/profilepic/now", arr,  { 
                                                headers: { 
                                                    'Content-Type': 'multipart/form-data'
                                                }
                                            }).then(res => { 
                                                sociao.src = res.data
                                            })
                                        }
                                    }}  type="file" name="" id="profilepic" className="d-none" />
                                <label htmlFor='profilepic' className="relative cursor-pointer overflow-hidden rounded-md m-0 p-0 w-full">
                                <motion.img dragConstraints={{top: 0, left: 0, right: 0, bottom: 0}} drag id='sociao' className='w-full' src={val.profilepic} alt="" />
                                </label>
                                </div>
                                <hr />
                                <div></div>
                                <br />
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                {val.fname}
                                </h3>
                            </div>
                            </div>
                        </div>
                        </div>
                    </motion.section>
                </div>
            )
        }
        else { 
            return ( 
                <div>
                    <section className="relative block h-500-px">
                        
                        <div className="absolute top-0 w-full h-full bg-center bg-cover" id='oubg' style={{backgroundImage: `url(${val.coverpic})`}}>
                        <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                        </div>
                        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: 'translateZ(0px)'}}>
                        <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                        </div>
                    </section>
                    <motion.section drag className="relative py-16 bg-blueGray-200">
                        <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-0 rounded-md overflow-hidden">
                             <img className='w-full' src={val.profilepic} alt="" />
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                {val.fname}
                                </h3>
                            </div>
                            </div>
                        </div>
                        </div>
                    </motion.section>
                </div>
            )
        }
    })
  
  }
</main>
    </div>
  )
//   style
}

export default Profile
