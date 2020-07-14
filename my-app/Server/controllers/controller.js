require('dotenv').config();
const { Client } = require('pg');
console.log(process.env.DB_HOST);
client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});
client.connect();
module.exports = {
    addTask: async function (req, result) {
        console.log("income:", req.body);
        let title = req.body.title;
        let description = req.body.description;
        //console.log(description)
        userID = req.user[0].id;
        //let location=req.body.location;
        let deadline = req.body.deadline;
        let hasUser;
        try {
            res = await client.query(`SELECT * FROM public.users WHERE id='${userID}'`)
            if (res.rows[0] === undefined) {
                hasUser = body;
                console.log(hasUser);
            }
        } catch (err) {
            console.log("err", err)
        }
        if (typeof hasUser != 'string') {
            console.log("addTask")
            try {
                res = await client.query(`insert into public.tasks
                ("userID",title,description,date_created,deadline)
                values('${userID}','${title}','${description}',current_date,'${deadline}')`);
                console.log("adding")
                return result.status(200).json({ res: "success" })
            } catch (err) {
                console.log('insert user info:', err);

            }
        }
    },
    getTasks: async function (req, result) {
        console.log(req.user[0].id)
        userID = req.user[0].id;
        let Tasks = {};
        let tasksList = [];
        try {
            res = await client.query(`select * from public.tasks
            where "userID"='${userID}' and "status" is NULL
            order by deadline asc`);
            console.log({ body: res.rows })
            if (res.rows[0] === undefined) {
                Tasks.title = "no tasks added";
                Tasks.description = "---";
                Tasks.date_created = "---";
                Tasks.deadline = "---";
                Tasks.status = ""
                Tasks.id = 1;
                tasksList.push(Tasks)
            } else {
                Tasks = res.rows;
                for (let i = 0; i < Tasks.length; i++) {
                    Tasks[i].date_created = (Tasks[i].date_created).toISOString().slice(0, 10)
                    Tasks[i].deadline = (Tasks[i].deadline).toISOString().slice(0, 10)
                    let currentDate = new Date;
                    var date = Number(currentDate.getDate());
                    var month = Number(currentDate.getMonth()) + 1;
                    var year = Number(currentDate.getFullYear());
                    if ((Tasks[i].deadline.slice(8, 10) + 3 >= date) ||
                        (month % 2 == 0 && Tasks[i].deadline.slice(8, 10) + 3 >= date + 31) ||
                        (month % 2 != 0 && Tasks[i].deadline.slice(8, 10) + 3 >= date + 30) ||
                        (month == 2 && year % 4 == 0 && Tasks[i].deadline.slice(8, 10) + 3 >= date + 29) ||
                        (month % 2 == 0 && year % 4 != 0 && Tasks[i].deadline.slice(8, 10) + 3 >= date + 28) ||
                        (month == 12 && day + 3 > 31)) {
                        Tasks[i].status = "coming";
                    }
                }
                tasksList = Tasks;
            }

            console.log(tasksList);
            result.json({ info: tasksList });
        } catch (err) {
            console.log('get tasks:', err);
            result.status(204).json({ err: err });
        }
    },
    removeTask: async function (req, result) {
        console.log("in remove", req.user, req.body.id)
        try {
            res = await client.query(`UPDATE public.tasks SET status='finished' where "taskID"=${req.body.id}`);
            console.log({ body: res.rows })
            result.status(200).json({ success: "Successfully finished task" })
        } catch (err) {
            console.log(err)
            result.status(400).json({ err: "Error finishing task" })
        }
    }
}