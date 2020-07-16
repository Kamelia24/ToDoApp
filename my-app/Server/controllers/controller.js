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
        userID = req.user[0].id;
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
        console.log("in get tasks", req.user[0].id, req.body)
        userID = req.user[0].id;
        numPage = req.body.num;
        let Tasks = {};
        let tasksList = [];
        try {
            res = await client.query(`select * from public.tasks
            where "userID"='${userID}' and "status" is NULL
            order by deadline asc offset ${numPage * 10} limit 10`);
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
                    let day = Number(Tasks[i].deadline.slice(8, 10));
                    let curmonth = Number(Tasks[i].deadline.slice(5, 7));
                    console.log("p", day, "p", curmonth)
                    let currentDate = new Date;
                    var date = Number(currentDate.getDate());
                    var month = Number(currentDate.getMonth()) + 1;
                    var year = Number(currentDate.getFullYear());
                    if (((day - 3 <= date && month == curmonth) ||
                        (date + 3 > 30 && month % 2 == 0 && day - 3 <= date + 30 && month + 1 == curmonth) ||
                        (date + 3 > 31 && month % 2 != 0 && day - 3 <= date + 31 && month + 1 == curmonth) ||
                        (date + 3 > 29 && month == 2 && year % 4 == 0 && day - 3 <= date + 29 && month + 1 == curmonth) ||
                        (date + 3 > 28 && month % 2 == 0 && year % 4 != 0 && day - 3 <= date + 28 && month + 1 == curmonth) ||
                        (date + 3 > 31 && month == 12 && day - 3 <= 31))) {
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
    },
    getNumOfTasks: async function (req, result) {
        console.log("in get number", req.body, req.user);
        userID = req.user[0].id
        try {
            res = await client.query(`SELECT COUNT("taskID")
            FROM public.tasks
            WHERE "userID"=${userID} and "status" is NULL;`);
            console.log({ body: res.rows[0].count })
            result.status(200).json({ num: Number(res.rows[0].count) })
        } catch (err) {
            console.log(err)
            result.status(400).json({ err: "Error finishing task" })
        }
    }
}