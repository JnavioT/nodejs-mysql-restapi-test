import {pool} from '../db.js'

export const getEmployees = async (req,res)=>{
    try {
        const [rows] =await pool.query('SELECT * FROM employee');
        res.send(rows)
    } catch (error) {
        return res.status(500).json({
            "message": 'Someting goes wronmg',
        })
    }

}

export const getEmployee = async (req,res)=>{
    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = (?)',req.params.id);
        if (rows.length <=0) return res.status(404).json({
            'message':'Id not founded',
        })  
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            "message": 'Someting goes wronmg',
        })
    }
    
}

export const postEmployees = async (req,res)=>{
    const {name,salary} = req.body;
    try {
        const [rows] =await pool.query('INSERT INTO employee (name, salary) VALUES (?,?)', [name,salary]);
        res.send({id: rows.insertId, name,salary});
    } catch (error) {
        return res.status(500).json({
            "message": 'Someting goes wronmg',
        })
    }
}

export const putEmployees =  async(req,res)=>{
    const {id} = req.params;
    const {name,salary} = req.body;
    try {
        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?,name), salary = IFNULL(?,salary) WHERE id = ?',[name,salary,id]);
        if (result.affectedRows<1) return res.status(404).json({
            'message':'Id not founded',
        })  
        const [row] =  await pool.query('SELECT * FROM employee WHERE id = (?)', id);
        console.log(row[0]);
        res.json(row[0]);
    } catch (error) {
        return res.status(500).json({
            "message": 'Someting goes wronmg',
        })
    }
}

export const deleteEmployees = async (req,res)=>{
    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', req.params.id);
        console.log(result);
        if (result.affectedRows<1) return res.status(404).json({
            'message':'Id not founded',
        })  
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            "message": 'Someting goes wronmg',
        })
    }
}