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
                let token = jwt.sign({payload: user['_id']}, _JWT_TOKEN_);
                res.cookie('login_token', token, {httpOnly: true});
                res.json({
                    message: 'User logged in'
                })
            } else {
                res.status(401).send('invalid email or password');
            }
        } else {
            res.status(404).json({
                message: 'User doesn\'t exists'
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
};

module.exports.authUserSignup = async function authUserSignup(req, res){
    try{
        let user = req.body;
        let savedUser = await userModel.create(user);
        if(savedUser){
            res.json({
                message: 'user created'
            })
        }else{
            res.json({
                message: 'some error occured'
            })
        }
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}