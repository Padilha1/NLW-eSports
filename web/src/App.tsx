//Components / Propriedades
import './styles/main.css'
import logoImg from './assets/Logo.svg'
import {MagnifyingGlassPlus} from 'phosphor-react'


function App() {
  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Your <span className='text-transparent bg-nlw-gradient bg-clip-text'> duo </span> is here!
      </h1>

    {/* Games API */}
      <div className='grid grid-cols-6 gap-6 mt-16'>
        <a href="" className='relative rounded-lg overflow-hidden'>
          <img src="/image 1.png" alt="" />
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>League of Legends</strong>
            <span className='text-zinc-300 text-sm block'> 4 ads</span>
          </div>
        </a>

        <a href="" className='relative rounded-lg overflow-hidden'>
          <img src="/image 2.png" alt="" />
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>Dota 2</strong>
            <span className='text-zinc-300 text-sm block'> 4 ads</span>
          </div>
                    
        </a>
        <a href="" className='relative rounded-lg overflow-hidden'>
          <img src="/image 3.png" alt="" />
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>Counter Strike: Global Offensive</strong>
            <span className='text-zinc-300 text-sm block'> 4 ads</span>
          </div>
                    
        </a>

        <a href="" className='relative rounded-lg overflow-hidden'>
          <img src="/image 5.png" alt="" />
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>Apex Legends</strong>
            <span className='text-zinc-300 text-sm block'> 4 ads</span>
          </div>
                    
        </a>

        <a href="" className='relative rounded-lg overflow-hidden'>
          <img src="/image 6.png" alt="" />
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>Fortnite</strong>
            <span className='text-zinc-300 text-sm block'> 4 ads</span>
          </div>
        </a>
        <a href="" className='relative rounded-lg overflow-hidden'>
          <img src="/image 7.png" alt="" />
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>World of Warcraft</strong>
            <span className='text-zinc-300 text-sm block'> 4 ads</span>
          </div>     
        </a>
      </div>

    {/* Bottom Box */}
      <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8 '>
        <div className='bg-[#2A2634] px-8 py-6 flex justify-between'>
          <div>
            <strong className='text-2xl text-white font-black block'> Didn't find your duo ?</strong>
            <span className='text-zinc-400 block'> Publish an ad to find new players!</span>
          </div>
          <button className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3'>
            <MagnifyingGlassPlus size={24}/>
            Publish AD
          </button>
        </div>
      </div>

    </div>
  )
}

export default App
