import express from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'; 
import { convertHourString } from './utils/convert-hour-string';
import { convertMinuteHours } from './utils/convert-minut-hours';

// HTTP methods                 / API RESTful / HTTP Codes
// GET, POST,PUT,PATCH, DELETE

const app = express()
const prisma = new PrismaClient()
app.use(express.json())
app.use(cors())


app.get('/games', async (request,response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    Ads: true
                },
            },
        },
    })

    return response.json(games);
});

app.post('/games/:id/ads', async (request,response) => {
    const gameId = request.params.id;
    const body: any = request.body;


    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            weekDays: body.weekDays.join(','),
            discord: body.discord,
            hourStart: convertHourString(body.hourStart),
            hourEnd: convertHourString(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
            createdAt: body.createdAt
            
        }
    })


    return response.json(ad);
});

app.get('/games/:id/ads', async(request, response) =>{
    const gameId = request.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id:true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy:{
            createdAt: 'desc',
        }
    })

        return response.json(ads.map(ad => {
            return {
                ...ad,
                weekDays: ad.weekDays.split(','),
                hourStart: convertMinuteHours(ad.hourStart),
                hourEnd: convertMinuteHours(ad.hourEnd),
            }
        }))
    })
app.get('/ads/:id/discord', async (request, response) =>{
    const adId = request.params.id;
    const Ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    });
    return response.json({
        discord: Ad.discord,
    });
});
app.listen(3333)