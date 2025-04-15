import './App.css'
import logo from '../src/assets/img/Image 1858.png'
import dashboard from '../src/assets/img/Squares four 1.png'
import projects from '../src/assets/img/Folder.png'
import teams from '../src/assets/img/Groups.png'
import analytics from '../src/assets/img/Pie chart.png'
import messages from '../src/assets/img/Chat.png'
import code from '../src/assets/img/Code.png'
import groups from '../src/assets/img/Group.png'
import bell from '../src/assets/img/Bell 1.png'
import question from '../src/assets/img/Question 1.png'
import avatar from '../src/assets/img/Avatar 313.png'
import giohang from  '../src/assets/img/Button 1509.png'
import dollar from  '../src/assets/img/Button 1529.png'
import icon from '../src/assets/img/Button 1530.png'
import visily from '../src/assets/img/visily.png'



function App() {

  return (
    
    <>
        <div className='flex'>

          <div className='menu w-1/5 shadow-lg'>
            <img src={logo} alt="logo_img" className='mb-5 py-5 px-10'/>
            <div className='mb-30'>
              <ul className='list-none px-10'>
                <li className='mb-5 group '><b><span className='font-bold text-gray-500 flex hover:text-white'><img src={dashboard} alt="" className='mr-2'/>Dasboard</span></b></li>
                <li className='mb-5 group'><b><span className='font-bold text-gray-500 flex'><img src={projects} alt="" className='mr-2'/>Projects</span></b></li>
                <li className='mb-5 group'><b><span className='font-bold text-gray-500 flex hover:text-white'><img src={teams} alt="" className='mr-2'/>Teams</span></b></li>
                <li className='mb-5 group'><b><span className='font-bold text-gray-500 flex hover:text-white'><img src={analytics} alt="" className='mr-2'/>Analytics</span></b></li>
                <li className='mb-5 group'><b><span className='font-bold text-gray-500 flex hover:text-white'><img src={messages} alt="" className='mr-2'/>Messages</span></b></li>
                <li className='mb-5 group'><b><span className='font-bold text-gray-500 flex hover:text-white'><img src={code} alt="" className='mr-2'/>Integrations</span></b></li>
              </ul>
            </div>
            <div className='bg-blue-100 p-5 rounded-sm m-5'>
              <img src={groups} alt="groups-img"/>
              <p className='text-black text-2xl font-bold mt-5'>V2.0 is available</p>
              <button className='mt-5 text-gray-500 w-30 shadow-lg' style={{backgroundColor: "white"}}>Try now</button>
            </div>
            <div className="flex p-5">
              <p className="text-gray-500 text-lg mt-1 mr-1">Made with</p>
              <img src={visily} alt="logo-img" className="w-20"/>
            </div>
          </div>

          <div className='shadow-lg'>

            <div className='flex shadow-sm py-5'>
              <a href="#"><span className='text-pink-400 font-bold text-3xl pl-10'>Dashboard</span></a>
              <input type="text" placeholder='  🔍Search..' className="border border-gray-200 bg-gray-100 text-gray-500 rounded-sm w-80 ml-100 pl-3"/>
              <img src={bell} alt="bell-img" className='ml-5 w-8 hover:bg-pink-300'/>
              <img src={question} alt="question-img"  className='ml-5 w-9  hover:bg-pink-300'/>
              <img src={avatar} alt="avatar-img"  className='ml-5  hover:bg-pink-300 mr-5'/>
            </div>

            <div>
              <div className='flex mt-6'>
                <img src={dashboard} alt="overview-img" className='pl-10'/>
                <p className='text-black font-bold text-xl ml-5'>Overview</p>
              </div>

              <div className='grid grid-cols-3 mt-5'>
                {/* Turnover */}
                <div className='bg-pink-200 text-left p-5 ml-10 mr-2 rounded-sm flex'>

                </div>
                {/* Profit */}
                <div className='bg-blue-100 text-left p-5 ml-6 mr-6 rounded-sm flex'>
                
                </div>

                {/* New customer */}
                <div className='bg-green-100 text-left p-5 ml-2 mr-10 rounded-sm flex'></div>
              </div>
        
            </div>

          </div>
          
        </div>
    </>
  )
}

export default App