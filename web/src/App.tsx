
//Components / Propriedades
import './styles/main.css'
import logoImg from './assets/Logo.svg'
import { GameBanner } from './components/GameBanner'
import { AdBanner } from './components/AdBanner'
import * as Dialog from '@radix-ui/react-dialog'

import { useState, useEffect } from 'react'
import { AdModal } from './components/AdModal'
import axios from 'axios'

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
		axios('http://localhost:3333/games').then(response => {
			setGames(response.data)
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

				<AdModal/>
			</Dialog.Root>
		</div>
  	)
}

export default App
