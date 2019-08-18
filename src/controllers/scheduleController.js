const db = require('../dao/clinicDB');
const shortid = require('shortid')

exports.post = (req, res, next) => {
    let type = req.body.type;
    let days = req.body.days;
    let intervals = req.body.intervals;
    let id = null

    if (type == 'weekly' || type == 'daily' || type == 'day')
    {
        id = shortid.generate()
        let schedules = db.get('schedules');

        schedules.push({
            id: id,
            type: type,
            days: days,
            intervals: intervals
        }).write();
        
        db.get('count', n => n + 1)
          .write()
        
        res.status(201).send(`Agendamento ${id} criada com sucesso!`);
    }
    else
    {
        console.log(req.body)
        res.status(400).send("Tipo incorreto de agendamento.")
    }
};

exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`Requisição recebida com sucesso! ${id}`);
};
exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Requisição recebida com sucesso! ${id}`);
};