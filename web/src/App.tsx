
//Components / Propriedades
import './styles/main.css'
import logoImg from './assets/Logo.svg'
import { GameBanner } from './components/GameBanner'
import { AdBanner } from './components/AdBanner'
import * as Dialog from '@radix-ui/react-dialog'

import { useState, useEffect } from 'react'
import { GameController } from 'phosphor-react'
import { Input } from './components/Form/Input'

interface Game {
	id: string;
	title: string;
	bannerUrl: string;
	_count: {
		Ads:number;
	}
}


function App() {

	const[ games, setGames] = useState<Game[]>([])

	useEffect(()=> {
		fetch('http://localhost:3333/games')
		.then(response => response.json())
		.then(data => {
			setGames(data)
		})
	}, 
	[])

 	return (
		<div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
			<img src={logoImg} alt="" />
			<h1 className='text-6xl text-white font-black mt-20'>
				Your <span className='text-transparent bg-nlw-gradient bg-clip-text'> duo </span> is here!
			</h1>

			{/* Games API */}
			<div className='grid grid-cols-9 gap-6 mt-16'>
				{games.map(game => {
					return (
						<GameBanner
							key={game.id}
							bannerUrl={game.bannerUrl}
							title={game.title}
							adsCount={game._count.Ads}
						/>
					)
				})}
			</div>
			{/* Bottom Box */}
			<Dialog.Root>
				<AdBanner/>

				<Dialog.Portal>
					<Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

					<Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
						<Dialog.Title className='text-3xl font-black'>Publish the Ad</Dialog.Title>
							<form action="" className='mt-8 flex flex-col gap-4'>
								<div className='flex flex-col gap-2'>
									<label htmlFor="game" className='font-semibold'>Which game?</label>
									<Input id="game"placeholder='Select the game you want to play'/>
								</div>
								<div className='flex flex-col gap-2'>
									<label htmlFor="name">Your name or nickname</label>
									<Input id="name" type="text" placeholder='How they call you ingame?'/>
								</div>
								<div className='grid grid-cols-2 gap-6'>
									<div className='flex flex-col gap-2'>
										<label htmlFor="yearsPlaying">Play how long ?</label>
										<Input id="yearsPlaying" type="number"  placeholder='Alright to be 0'/>
									</div>
									<div className='flex flex-col gap-2'>
										<label htmlFor="discord">What is your Discord?</label>
										<Input id="discord" type="text" placeholder='User#3434'/>
									</div>
								</div>

								<div className='flex gap-6'>
									<div className='flex flex-col gap-2'>
										<label htmlFor="weekDays">When do you play?</label>
										<div className='grid grid-cols-4 gap-2'>
											<button  className='w-8 h-8 rounded bg-zinc-900' 
											title='Domingo'>D
											</button>
											<button  className='w-8 h-8 rounded bg-zinc-900' 
											title='Segunda'>S
											</button>
											<button  className='w-8 h-8 rounded bg-zinc-900' 
											title='Terca'>T</
											button>
											<button  className='w-8 h-8 rounded bg-zinc-900' 
											title='Quarta'>Q
											</button>
											<button  className='w-8 h-8 rounded bg-zinc-900' 
											title='Quinta'>Q
											</button>
											<button  className='w-8 h-8 rounded bg-zinc-900' 
											title='Sexta'>S
											</button>
											<button  className='w-8 h-8 rounded bg-zinc-900' 
											title='Sabado'>S
											</button>
										</div>

									</div>
									<div className='flex flex-col gap-2 flex-1'>
										<label htmlFor="hourStart">What time?</label>
										<div className='grid grid-cols-2 gap-2'>
											<Input id="hourStart" type="time" placeholder='From'/>
											<Input id="hourEnd" type="time" placeholder='Until'/>
										</div>
									</div>
								</div>

								<div className='mt-2 flex gap-2 text-sm'>
									<input type="checkbox" />
										I use VOIP
								</div>
								<footer className='mt-4 flex justify-end gap-4'>
									<Dialog.Close type="button"
											className='bg-zinc-500 rounded-md px-5 h-12 font-semibold hover:bg-zinc-600'>
											Cancel
									</Dialog.Close>
									<button type='submit'
											className='bg-violet-500 rounded-md px-5 h-12 font-semibold flex items-center gap-3 hover:bg-violet-700'
									>
										<GameController size={24}/>
										Find Duo
									</button>
								</footer>
							</form>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>

		</div>
  	)
}

export default App
