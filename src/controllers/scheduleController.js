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
        
        res.status(201).send(`Schedule ${id} created successfully!`);
    }
    else
    {
        console.log(req.body)
        res.status(400).send("Incorrect schedule type.")
    }
};

exports.get = (req, res, next) => {
    let schedules = db.get('schedules');
    let dev = req.params.dev

    if (dev != "dev")
        schedules = schedules.forEach(schedule => {
            delete schedule.id;
        }).value();

    res.status(200).send(schedules);
};

function stringToDate(string)
{
    let d = string.split('-');
    return new Date(d[2], d[1]-1, d[0]);
}

exports.check = (req, res, next) => {
    const weekday = [
                        "sun", 
                        "mon", 
                        "tue", 
                        "wed", 
                        "thu", 
                        "fri", 
                        "sat"
                    ];
    const dateFormat = new Intl.DateTimeFormat('pt-BR');

    let start = stringToDate(req.params.start);
    let end = stringToDate(req.params.end);
    let schedules = db.get('schedules');
    let response = [];

    while (start <= end)
    {
        let startString = dateFormat.format(start).replace(/\//g,'-');
        let startDay = weekday[start.getDay()];
        let daySchedules = [];

        schedules.forEach(schedule => {
            const scheduleDay = (schedule.type == 'day' && schedule.days == startString);
            const scheduleWeekly = (schedule.type == 'weekly' && schedule.days.includes(startDay))
            
            if (scheduleDay || schedule.type == 'daily' || scheduleWeekly)
                daySchedules = daySchedules.concat(schedule.intervals);
        }).value();

        if (daySchedules.length > 0)
        {
            daySchedules.sort(function(a, b) { return a.start > b.start; })
            response.push({"day": startString, "intervals": daySchedules});
            delete daySchedules
        }

        console.log(`Searched date ${startString}.`);
        start.setDate(start.getDate() + 1)
    }

    if (response.length > 0)
        res.status(200).send(response);
    else
        res.status(400).send("No vacant space found on schedule.");
}

exports.delete = (req, res, next) => {
    let schedules = db.get('schedules');
    let schedule = schedules.find({id: req.params.id}).value()    

    if (schedule == undefined)
        res.status(400).send('Schedule rule not found.');
    else
    {
        schedules.remove({id: schedule.id})
                 .write()

        res.status(200).send(`Schedule ${schedule.id} removed successfully!`);
    }
};