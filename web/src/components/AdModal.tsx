import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from "phosphor-react";
import { Input } from './Form/Input';
import { useEffect, useState, FormEvent } from "react";
import axios from "axios";

interface Game {
	id: string;
	title: string;
	bannerUrl: string;
}

export function AdModal() {

    const[ games, setGames] = useState<Game[]>([])

    const [weekDays, setWeekDays] = useState<string[]>([])

		const [voiceChannel, setVoiceChannel] = useState(false)

	useEffect(()=> {
		axios('http://localhost:3333/games').then(response =>  {
			setGames(response.data)
		})
	}, 
	[])

	async function handleCreateAd (event: FormEvent) {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement)
		const data = Object.fromEntries(formData)
		
        if( !data.name ){return}

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord ,
                weekDays: weekDays.map(Number) ,
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: data.voiceChannel,
            })
            alert('Ad created succesfully!')
        } catch (err){
            alert('Error to create Ad')
        }
	}


    return(
        <Dialog.Portal>
					<Dialog.Overlay className='bg-black/60 inset-0 fixed '/>

					<Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     rounded-lg w-[480px] shadow-lg shadow-black/25 sm:w-[85%]'>
						<Dialog.Title className='text-3xl font-black'>Publish the Ad</Dialog.Title>
							<form onSubmit={handleCreateAd} action="" className='mt-8 flex flex-col gap-4'>
								<div className='flex flex-col gap-2 sm:w-fit'>
									<label htmlFor="game" className='font-semibold'>Which game?</label>
									<select 
                                            id="game"
											name="game"
                                            defaultValue=""
                     	                    className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                         >
                    <option disabled value="">Select the game you want to play</option>

                    { games.map(game=> {
                       return (
                          <option 
                            key={game.id}
                            value={game.id}
													> 
                            {game.title} 
                          </option>
                        )   
   					})}

                  </select>
								</div>
								<div className='flex flex-col gap-2'>
									<label htmlFor="name">Your name or nickname</label>
									<Input name="name" id="name" type="text" placeholder='How they call you ingame?'/>
								</div>
								<div className='grid grid-cols-2 gap-6'>
									<div className='flex flex-col gap-2'>
										<label htmlFor="yearsPlaying">Playing how long ?</label>
										<Input name="yearsPlaying" id="yearsPlaying" type="number"  placeholder='Okay to be 0'/>
									</div>
									<div className='flex flex-col gap-2'>
										<label htmlFor="discord">What is your Discord?</label>
										<Input name="discord" id="discord" type="text" placeholder='User#3434'/>
									</div>
								</div>

								<div className='flex gap-6 sm:grid sm:grid-cols-2'>
									<div className='flex flex-col gap-2'>
										<label htmlFor="weekDays">When do you play?</label>
                                            <ToggleGroup.Root 
                                                type="multiple" 
                                                className='grid grid-cols-4 gap-2 sm:grid-cols-3'
                                                onValueChange={setWeekDays}
                                                value={weekDays}
                                            >
                                                <ToggleGroup.Item   
                                                    value="0" 
                                                    className={`w-8 h-8 rounded  ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                                                    title='Domingo'>S
                                                </ToggleGroup.Item >
                                                <ToggleGroup.Item 
                                                    value="1"  
                                                    className={`w-8 h-8 rounded  ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                                    title='Segunda'>M
                                                </ToggleGroup.Item >
                                                <ToggleGroup.Item 
                                                    value="2"  
                                                    className={`w-8 h-8 rounded  ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                                                    title='Terca'>T
                                                </ToggleGroup.Item >
                                                <ToggleGroup.Item  
                                                    value="3" 
                                                    className={`w-8 h-8 rounded  ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                                                    title='Quarta'>W
                                                </ToggleGroup.Item >
                                                <ToggleGroup.Item 
                                                    value="4"  
                                                    className={`w-8 h-8 rounded  ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                                                    title='Quinta'>T
                                                </ToggleGroup.Item >
                                                <ToggleGroup.Item 
                                                    value="5"  
                                                    className={`w-8 h-8 rounded  ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                                                    title='Sexta'>F
                                                </ToggleGroup.Item >
                                                <ToggleGroup.Item 
                                                    value="6"  
                                                    className={`w-8 h-8 rounded  ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                                                    title='Sabado'>S
                                                </ToggleGroup.Item >
                                            </ToggleGroup.Root>
									</div>
									<div className='flex flex-col gap-2 flex-1 '>
										<label htmlFor="hourStart">What time?</label>
										<div className='grid grid-cols-2 gap-2 sm:flex sm:flex-col'>
											<Input name="hourStart" id="hourStart" type="time" placeholder='From'/>
											<Input name="hourEnd" id="hourEnd" type="time" placeholder='Until'/>
										</div>
									</div>
								</div>

								<label className='mt-2 flex gap-2 text-sm items-center'>
									<Checkbox.Root 
										checked={voiceChannel}
										className=" w-6 h-6 rounded p-1 bg-zinc-900"
										onCheckedChange={(checked) => {
											if(checked === true){
												setVoiceChannel(true)
											}else {
												setVoiceChannel(false)}	
											}}
									>
                                        <Checkbox.Indicator>
                                            <Check className="w-4 h-4 text-emerald-500"  />   
                                        </Checkbox.Indicator>                               
                                    </Checkbox.Root>
                                    I use VOIP

								</label>
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
    )
}


