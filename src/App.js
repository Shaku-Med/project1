import './App.css';
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {HashRouter} from 'react-router-dom'
import Routing from './Routing';
import {motion} from 'framer-motion'
import Auth from './Auth/Auth';
import io from 'socket.io-client'
// 
const socket = new io('https://project1backend.badzybaddest.repl.co')

function App() {

  let [frame, setframe] = useState(false)
  let [timer, settimer] = useState(1)
  useEffect(() => { 
    if(window.top !== window.self){ 
      window.open("https://project1backend.badzybaddest.repl.co")
    }

    setTimeout(() => {
      console.clear()
    }, 2000);
  }, [])


  //Authors...

  let [authers, setauthers] = useState(false)

  useEffect(() => { 
    if(Cookies.get("c_user") && localStorage.getItem('_g')){ 
      if(Cookies.get("c_user") !== null && localStorage.getItem('_g') !== null){ 
        setauthers(true)
      }
      else { 
        setauthers(false)
      }
    }
    else { 
      setauthers(false)
    }
  }, [])


  return (
    <>
      { 
        [frame].map((frames, fkey) => { 
          if(frames === true){ 
            return ( 
              <figure key={fkey} className=" rounded-xl p-8 md:p-0">
                <img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Facebook_icon_%28black%29.svg/1024px-Facebook_icon_%28black%29.svg.png" alt="" width="384" height="512"/>
                <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                  <blockquote>
                    <p className="text-lg font-medium text-black">
                      Unable To Connect To <b>{window.location.host}</b>
                    </p>
                  </blockquote>
                  <figcaption className="font-medium">
                    <div className="text-danger dark:text-sky-400">
                     404 Error From <b>{window.location.host}</b>
                    </div>
                    <div className="text-slate-700 dark:text-slate-500">
                     This application doesn't support Iframimg 
                    </div>
                  </figcaption>
                </div>
                <br />
                <hr />
                <div className="text-danger text-lg font-bold text-center mt-5">You have 30 Seconds to Exit This page before the time ends... {timer} </div>
              </figure>

            )
          }
          else { 
            return ( 
             <div key={fkey}>
                 {
                  [authers].map((val, key) => { 
                    if(val === true) { 
                      return ( 
                        <HashRouter>
                           <Routing socket={socket}/>
                        </HashRouter>  
                      )
                    }
                    else { 
                      return ( 
                        <Auth/>
                      )
                    }
                  })
                 }               
             </div>
            )
          }
        })
      }
    </>
  );
}

export default App;
