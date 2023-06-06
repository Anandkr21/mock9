const express = require('express')
const { postModel } = require('../model/postModel')
require('dotenv').config();

const postRouter = express.Router();

// get all data here
postRouter.get('/posts', async (req, res) => {
    try {
        const alldata = await postModel.find();
        res.status(200).send(alldata)
    } catch (error) {
        return res.status(400).send({
            msg: error.message
        })
    }
});

// create post route
postRouter.post('/posts', async (req, res) => {
    try {
        const { text, image } = req.body;
        if (text == undefined || image == undefined) {
            return res.status(400).send({
                msg: "Enter all details."
            })
        }
        const id = req.user;
        const post = await postModel.insertMany([{
            user: id, text, image
        }])
        return res.status(201).send({
            msg: "You haave created post"
        })
    } catch (error) {
        return res.status(400).send({
            msg: error.message
        })
    }
})


postRouter.patch('/posts/:id', async (req, res) => {
    try {
        const { text, image } = req.body;
        const id = req.user;
        const postId = req.params.id
        const post = await postModel.findOne({ _id: postId, user: id })
        if (!post) {
            return res.status(400).send({ "msg": "Something went wrong" })
        }
        if (text != undefined) {
            post.text = text;
            await post.save()
        }
        if (image != undefined) {
            post.image = image;
            await post.save()
        }
        return res.status(204).send({ "msg": "You have been updated a post" })
    }
    catch (err) {
        return res.status(400).send({ "msg": err.message })
    }
})


postRouter.delete('/posts/:id', async(req,res) =>{
    try{ 
        const postid=req.params.id;
        const id=req.user
        const post =await postModel.findOne({_id:postid,user:id})
        if(!post){
            return res.status(400).send({"msg":"You cannot delete someone else post"})
        }
        await postModel.findByIdAndDelete(postid)
        return res.status(202).send({"Msg":"post has been deleted successfully"})


    }
    catch(err){
        return res.status(400).send({msg :err.message})
    }
})

module.exports = { postRouter }