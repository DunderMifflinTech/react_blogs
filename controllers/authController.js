const userModel = require('../models/userModel');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _JWT_TOKEN_ = require('./../secret');

module.exports.authUserLogin = async function authUserLogin(req, res){
    try{
        let user = req.body;
        let dbUser = await userModel.findOne({email: user.email})
        if(dbUser){
            let pass = await bcrypt.compare(user.password, dbUser.password);
            if(pass){
                console.log('user exists')
                let token = jwt.sign({payload: user['_id']}, _JWT_TOKEN_);
                // res.cookie('login_token', token);
                res.cookie('login_token', token, {httpOnly: true});
                res.status(200).json({
                    message: 'User logged in'
                })
            } else {
                console.log('wrong pass')
                res.status(401).send('invalid password');
            }
        } else {
            console.log('user does not exist')
            res.status(404).json({
                message: 'User doesn\'t exists'
            })
        }
    }catch(err){
        console.log('server error');
        res.status(500).json({
            message: err.message
        })
    }
};

module.exports.authUserSignup = async function authUserSignup(req, res){
    try{
        let user = req.body;
        let doesUserExist = userModel.findOne({email: req.body.email});
        if(doesUserExist){
            res.status(400).json({
                message: 'user exists'
            })
        }
        let savedUser = await userModel.create(user);
        
        if(savedUser){
            let token = jwt.sign({payload: savedUser['_id']}, _JWT_TOKEN_);
            res.cookie('login_token', token, {httpOnly: true});
            res.json({
                message: 'user created'
            })
        }else{
            res.status(500).json({
                message: 'unable to save user in database'
            })
        }
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}