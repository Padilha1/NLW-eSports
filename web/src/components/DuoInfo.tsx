import { useEffect, useState } from "react";
import { DuoCardProps } from "./AdListModal";
import {DiscordLogo} from 'phosphor-react'

interface Props {
    id: string
    hourEnd:string;
    hourStart: string;
    name:string;
    useVoiceChannel: boolean;
    weekDays: string[]
    yearsPlaying: number;
}

interface Discord {
    discord: string;
}

export function DuoInfo({id,hourEnd, hourStart, name, useVoiceChannel, weekDays, yearsPlaying}: Props){

    const [duos, setDuos] = useState<DuoCardProps[]>([])
    useEffect(() =>{
    fetch(`http://localhost:3333/games/${id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
  }, []);

    const [discordId, setDiscordId] = useState<Discord>()
    useEffect(()=> {
        fetch(`http://localhost:3333/ads/${id}/discord`)
        .then(response => response.json())
        .then(ques => setDiscordId(ques))
    },[]);

        return(
                <div className=' keen-slider__slide p-2 rounded text-center bg-slate-900'>
                        <div className=" text-lg rounded-lg ml-4 mr-4 text-center ">{name}</div>
                        <div className=" text-lg p-1 rounded mt-2 mb-2 flex flex-col items-center">
                            <DiscordLogo size={20} color="#7a72e3"/>
                            {discordId?.discord}
                        </div>
                        <div className="text-[1rem] mb-1 text-zinc-400">
                            Avaiable {`${weekDays.length} days ${hourStart} - ${hourEnd}` }
                        </div>
                        <div className="text-md text-zinc-400"> Voice Call :
                             <span className={useVoiceChannel === false ? "text-red-600" : "text-emerald-500"} > {useVoiceChannel ? "Yes" : "No"} 
                             </span>
                         </div>
                </div>
        )

}