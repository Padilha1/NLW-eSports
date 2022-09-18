import * as Dialog from "@radix-ui/react-dialog"
import axios from "axios";
import { useEffect, useState } from "react";
import { DuoInfo } from "./DuoInfo";
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

export interface DuoCardProps {
    id:string;
    hourEnd:string;
    hourStart: string;
    name:string;
    useVoiceChannel: boolean;
    weekDays: string[]
    yearsPlaying: number;
}


interface Props {
    data: string;
    onConnect: () => void;
}

export function AdListModal ({data, onConnect}: Props) {
    const [sliderRef, instanceRef] = useKeenSlider(
        {
          slideChanged(){},
          loop: true,
        },
        
      )

    const [duos, setDuos] = useState<DuoCardProps[]>([])
    useEffect(() =>{
    fetch(`http://localhost:3333/games/${data}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
  }, []);


        return(
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/60 inset-0 fixed '/>

                <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                rounded-lg w-[480px] shadow-lg shadow-black/25 sm:w-[85%] '>

                    <h1 className="text-center  font-bold text-lg mb-4">ADS ON</h1>
                    <div className="keen-slider text-center" ref={sliderRef}> 
                        {duos.map((item)=>{
                            return(
                                <DuoInfo   
                                    id={item.id}
                                    name={item.name}
                                    useVoiceChannel={item.useVoiceChannel}
                                    hourEnd={item.hourEnd}
                                    hourStart={item.hourStart}
                                    yearsPlaying={item.yearsPlaying}
                                    weekDays={item.weekDays}
                                />
                            )
                        })}
                    </div>
                </Dialog.Content>
        
    </Dialog.Portal>
        )
}