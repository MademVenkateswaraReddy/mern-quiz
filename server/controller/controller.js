import Questions from "../models/questionSchema.js"
import Result from "../models/resultSchema.js"
import questions, {answers} from '../database/data.js'
import resultSchema from "../models/resultSchema.js"

export async function getQuestions(req, res){
    try {
        const q = await Questions.find()
        res.json(q)
    } catch (error) {
        res.json({error})
    }
}

export async function insertQuestions(req, res){
    try {
        const data = await Questions.insertMany({questions, answers})
            res.json({msg: 'Data saved successfully....', data})
    } catch (error) {
        res.json(error)
    }
}

export async function dropQuestions(req, res){
    try {
        await Questions.deleteMany();
        res.json({msg : 'Questions deleted successfully....'})
    } catch (error) {
        res.json({error})
    }
}

export async function getResult(req, res){
    try {
        const r = await Result.find()
        res.json(r)
    } catch (error) {
        res.json({error})
    }
}

export async function insertResult(req, res){
    try {
        const {username, result, attempts, points, achived} = req.body
        if (!username || !result) {
            throw new Error('Username and Result are required fields.');
        }

        const data = await Result.create({ username, result, attempts, points, achived });
        res.json({ msg: 'Result saved successfully', data });
    } catch (error) {
        res.json({error})
    }
}

export async function dropResult(req, res){
    try {
        await Result.deleteMany();
        res.json({msg : 'Result deleted successfully'})
    } catch (error) {
        
    }
}