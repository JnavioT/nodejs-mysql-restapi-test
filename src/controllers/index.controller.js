import {pool} from '../db.js'

export const getindex = async (req,res)=>{
    const [result] =await pool.query('SELECT "nong" AS result');
    res.json(result[0]);
}