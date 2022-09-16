import {MagnifyingGlassPlus} from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

export function AdBanner(){
    return (
        <div className='relative pt-1 rounded-xl mt-10 sm:w-[85%] lg:self-stretch'>
            <div className='absolute -inset-0.5 bg-nlw-gradient blur-xl opacity-70 animate-wave'></div>
                <div className=' relative bg-[#2A2634] px-8 py-6 flex justify-between sm:grid sm:grid-cols-1'>
                <div >
                    <strong className='text-2xl text-white font-black block'> Didn't find your duo ?</strong>
                    <span className='text-zinc-400 block sm:mt-2 '> Publish an ad to find new players!</span>
                </div>
                <Dialog.Trigger className='py-3 px-4 sm:mt-8 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3 justify-center'>
                    <MagnifyingGlassPlus size={24}/>
                    Publish AD
                </Dialog.Trigger>
            </div>
      </div>
    )
}