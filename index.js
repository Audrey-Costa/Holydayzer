import express, { response } from "express";
import cors from 'cors';

const server = express()
server.use(cors())
const hoje = new Date()
const dateFormat = hoje.toLocaleDateString('en-us').split('/')


const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "3/1/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
  ];

server.get('/holidays', (_, response)=>{
    response.send(
        holidays
    )
})


server.get('/is-today-holiday', (_, response)=>{
    let holiday = false;
    let index = 0
    for(let i = 0; i < holidays.length; i++){
        if(dateFormat[0] === holidays[i].date.split('/')[0] && dateFormat[1] === holidays[i].date.split('/')[1] && dateFormat[2] === holidays[i].date.split('/')[2]){
            holiday = true
            index = i
        }
    }
    if(holiday){
        response.send(
            `Hoje é ${holidays[index].name}`
        )

    }else{
        response.send(
            "Não, hoje não é feriado"
        )
    }
})


server.get('/holidays/:idMonth', (require, response)=>{
    const id = require.params.idMonth;
    const monthHolidays = holidays.filter(
        (element) => element.date.split('/')[0] === id)
    console.log(monthHolidays)
    response.send(
        monthHolidays.map((element)=> element.name )
    )
})

server.listen(4000)