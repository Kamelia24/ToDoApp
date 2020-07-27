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
        console.log("in get tasks", req.user, req.body)
        if (req.body.userID != "no") {
            userID = req.body.userID;
        } else {
            userID = req.user[0].id;
        }
        console.log("userId:", userID)
        numPage = req.body.num;
        let Tasks = {};
        let tasksList = [];
        try{

        } catch(err){

        }
        try {
            res = await client.query(`select "taskID","userID",title,description,date_created,deadline, 
            case when deadline<=current_date+3 then 'coming' end status
            from public.tasks
            where "userID"='${userID}' and "status" is NULL
            order by deadline asc offset ${numPage * 10} limit 10`);
            console.log({ body: res.rows })
            if (res.rows[0] != undefined) {
                Tasks = res.rows;
                for (let i = 0; i < Tasks.length; i++) {
                    Tasks[i].date_created = (Tasks[i].date_created).toISOString().slice(0, 10)
                    Tasks[i].deadline = (Tasks[i].deadline).toISOString().slice(0, 10)
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
            console.log("in remove task", err)
            result.status(400).json({ err: "Error finishing task" })
        }
    },
    getNumOfTasks: async function (req, result) {
        console.log("in get number", req.body, req.user);
        if (req.body.userID != "no") {
            userID = req.body.userID;
        } else {
            userID = req.user[0].id;
        }
        try {
            res = await client.query(`SELECT COUNT("taskID")
            FROM public.tasks
            WHERE "userID"=${userID} and "status" is NULL;`);
            console.log({ body: res.rows[0].count })
            result.status(200).json({ num: Number(res.rows[0].count) })
        } catch (err) {
            console.log("in get pages", err)
            result.status(400).json({ err })
        }
    },
    getUsers: async function (req, result) {
        console.log("in get users:", req.body)
        numPage = req.body.num - 1;
        console.log(numPage);
        try {
            res = await client.query(`SELECT username,id,name,age from public.users order by id asc offset ${numPage * 10} limit 10`)
            console.log(res.rows);
            result.status(200).json({ data: res.rows })
        } catch (err) {
            result.status(400).json({ error: error })
        }
    },
    getNumOfUsers: async function (req, result) {
        console.log("in get users number", req.body, req.user);
        try {
            res = await client.query(`SELECT COUNT(id)
            FROM public.users`);
            console.log({ body: res.rows[0].count })
            result.status(200).json({ num: Number(res.rows[0].count) })
        } catch (err) {
            console.log("in get users number", err)
            result.status(400).json({ err })
        }
    },
    getNumOfFinTasks: async function (req, result) {
        console.log("in get number", req.body, req.user);
        let userID = req.user[0].id;
        let dateFrom = req.body.dateFrom;
        let dateTo = req.body.dateTo;
        try {
            res = await client.query(`SELECT COUNT("taskID")
            FROM public.tasks
            WHERE "userID"=${userID} and "status" is not NULL and "date_created" between '${dateFrom}' and '${dateTo}'`);
            console.log({ body: res.rows[0].count })
            result.status(200).json({ num: Number(res.rows[0].count) })
        } catch (err) {
            console.log("in get pages", err)
            result.status(400).json({ err })
        }
    },
    getFinishedTasks: async function (req, result) {
        console.log("in get tasks", req.user, req.body)

        userID = req.user[0].id;

        let dateFrom = req.body.dateFrom;
        let dateTo = req.body.dateTo;
        console.log("userId:", userID)
        numPage = req.body.num;
        let Tasks = {};
        let tasksList = [];
        try {
            res = await client.query(`select * from public.tasks
            where "userID"='${userID}' and "status" is not NULL and "date_created">= '${dateFrom}' and "date_created"<='${dateTo}'
            order by deadline asc offset ${numPage * 10} limit 10`);
            console.log({ body: res.rows })
            if (res.rows[0] !== undefined) {
              
                tasksList = res.rows;
            }

            console.log(tasksList);
            result.json({ info: tasksList });
        } catch (err) {
            console.log('get tasks:', err);
            result.status(204).json({ err: err });
        }
    }
}