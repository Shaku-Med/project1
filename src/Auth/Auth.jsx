import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import Cookies from 'js-cookie'
function Auth() {
    let [authus, setauth] = useState([])

    useEffect(() => { 

        let params = (new URL(document.location)).searchParams
        let name = params.get("signup")
        if(name !== null){ 
            setauth({ 
                login: false,
                signup: true
            })
        }
        else { 
            setauth({ 
                login: true,
                signup: false
            })
        }
        
    }, [])


    // Sign up auth...s 

    const [fname, setfname] = useState('')
    const [semail, setsemail] = useState('')
    const [spass, setspass] = useState('')
    const [sconfirm, setsconfirm] = useState('')

    // Login

    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')

  return (
    <div>
       { 
         [authus].map((val, key) => { 
            if(val.signup === true && val.login === false){ 

                const handlesubmit = e => { 
                    e.preventDefault()
                    let emailregix = /^[\w.+\-]+@gmail\.com$/
                    let passregix = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

                    let terms = document.querySelector("#terms")
                    if(fname === ""){ 
                        alert("Enter your full name")
                    }
                    else if(fname.length < 2){ 
                        alert("Enter a valid last name.")
                    }
                    else if(semail === ""){ 
                        alert("Enter your email.")
                    }
                    else if(!semail.match(emailregix)){ 
                        alert("No valid email | @gmail.com required")
                    }
                    else if(spass === ""){ 
                        alert("Enter your password")
                    }
                    else if(!spass.match(passregix)){ 
                        alert("Your password is not secured. enter a secured password mixed with letters and symbols")
                    }
                    else if(spass !== sconfirm){ 
                        alert("These passwords do not match.")
                    }
                    else if(terms.checked === false){ 
                        alert("You need to agree to our terms")
                    }
                    else { 
                        let button = document.querySelector("button")
                        button.disabled = true
                        button.innerHTML = "Processing..."
                        let arr = {
                            fname: fname,
                            semail: semail,
                            spass: spass,
                            unic_id: uuidv4(),
                            pageid: uuidv4(),
                            profilepic: 'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg',
                            coverpic: '',
                        }

                        axios.post("http://localhost:3001/users/signup/auth", arr).then(res => { 
                           if(res.data.success === "success"){ 
                            window.open("/", "_self")
                           }
                           else { 
                            button.disabled = false
                            button.innerHTML = "Create an account"
                            alert(res.data.success)
                           }
                        })
                    }
                }

                return ( 
                    <section key={key} class="bg-gray-0 dark:bg-gray-900 overflow-auto" style={{width: "100%", height: "100vh"}}>
                        <div class="flex flex-col items-center justify-start px-0 py-8 mx-auto md:h-screen lg:py-0">
                            
                            <div class="w-full rounded-lg   md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700 text-black">
                                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 class="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
                                        Create an account
                                    </h1>
                                    <form onSubmit={handlesubmit} class="space-y-4 md:space-y-6" action="">
                                        <div>
                                            <input onChange={e => setfname(e.target.value)} type="text" name="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Full Name" required=""/>
                                        </div>
                                        <div>
                                            <input  onChange={e => setsemail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@company.com" required=""/>
                                        </div>
                                        <div>
                                            <input  onChange={e => setspass(e.target.value)} type="password" name="password" id="password" placeholder="Password ••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                        </div>
                                        <div>
                                            <input  onChange={e => setsconfirm(e.target.value)} type="confirm-password" name="confirm-password" id="confirm-password" placeholder="Confirm password ••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                        </div>
                                        <div class="flex items-start">
                                            <div class="flex items-center h-5">
                                                <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                            </div>
                                            <div class="ml-3 text-sm">
                                                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                            </div>
                                        </div>
                                        <button type="submit" class=" btn btn-danger w-full text-black dark:text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Already have an account? <a href="../#/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
            else if(val.signup === false && val.login === true) { 


                const handlesubmit = e => { 
                    e.preventDefault()
                    let emailregix = /^[\w.+\-]+@gmail\.com$/
                    let passregix = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

                    let terms = document.querySelector("#terms")
                     if(email === ""){ 
                        alert("Enter your email.")
                    }
                    else if(!email.match(emailregix)){ 
                        alert("No valid email | @gmail.com required")
                    }
                    else if(pass === ""){ 
                        alert("Enter your password")
                    }
                    else if(!pass.match(passregix)){ 
                        alert("Your password is not secured. enter a secured password mixed with letters and symbols")
                    }
                    else if(terms.checked === false){ 
                        alert("You need to agree to our terms")
                    }
                    else { 
                        let button = document.querySelector("button")
                        button.disabled = true
                        button.innerHTML = "Processing..."
                        let arr = {
                            email: email,
                            pass: pass,
                        }

                        axios.post("http://localhost:3001/users/login/auth", arr).then(res => { 
                           if(res.data.success === "success"){ 
                             Cookies.set("c_user", res.data.unic_id, {secure: true, expires: 200})
                             localStorage.setItem("_g", uuidv4())
                             window.location.reload()
                           }
                           else { 
                            button.disabled = false
                            button.innerHTML = "Create an account"
                            alert(res.data.success)
                           }
                        })
                    }
                }

                return ( 
                    <section key={key} class="bg-gray-0 dark:bg-gray-900 overflow-auto" style={{width: "100%", height: "100vh"}}>
                        <div class="flex flex-col items-center justify-start px-0 py-8 mx-auto md:h-screen lg:py-0">
                            
                            <div class="w-full rounded-lg   md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700 text-black">
                                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 class="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
                                        Login
                                    </h1>
                                    <form onSubmit={handlesubmit} class="space-y-4 md:space-y-6" action="">
                                        <div>
                                            <input  onChange={e => setemail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@company.com" required=""/>
                                        </div>
                                        <div>
                                            <input  onChange={e => setpass(e.target.value)} type="password" name="password" id="password" placeholder="Password ••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                        </div>
                                        <div class="flex items-start">
                                            <div class="flex items-center h-5">
                                                <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                            </div>
                                            <div class="ml-3 text-sm">
                                                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                            </div>
                                        </div>
                                        <button type="submit" class=" btn btn-danger w-full text-black dark:text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Do not have an account? <a href={"../?signup=" + uuidv4()} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
         })
       }
    </div>
  )
}

export default Auth
