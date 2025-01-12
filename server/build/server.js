"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const convert_hour_string_1 = require("./utils/convert-hour-string");
const convert_minut_hours_1 = require("./utils/convert-minut-hours");
// HTTP methods                 / API RESTful / HTTP Codes
// GET, POST,PUT,PATCH, DELETE
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/games', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield prisma.game.findMany({
        include: {
            _count: {
                select: {
                    Ads: true
                },
            },
        },
    });
    return response.json(games);
}));
app.post('/games/:id/ads', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = request.params.id;
    const body = request.body;
    const ad = yield prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            weekDays: body.weekDays.join(','),
            discord: body.discord,
            hourStart: (0, convert_hour_string_1.convertHourString)(body.hourStart),
            hourEnd: (0, convert_hour_string_1.convertHourString)(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
            createdAt: body.createdAt
        }
    });
    return response.json(ad);
}));
app.get('/games/:id/ads', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = request.params.id;
    const ads = yield prisma.ad.findMany({
        select: {
            id: true,
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
        orderBy: {
            createdAt: 'desc',
        }
    });
    return response.json(ads.map(ad => {
        return Object.assign(Object.assign({}, ad), { weekDays: ad.weekDays.split(','), hourStart: (0, convert_minut_hours_1.convertMinuteHours)(ad.hourStart), hourEnd: (0, convert_minut_hours_1.convertMinuteHours)(ad.hourEnd) });
    }));
}));
app.get('/ads/:id/discord', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const adId = request.params.id;
    const Ad = yield prisma.ad.findUniqueOrThrow({
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
}));
app.listen(3333);
