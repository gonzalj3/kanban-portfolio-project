const User = require('../models/Users');
const {initializeFirstBoard} = require('../controllers/boards');
const { ErrorResponse, errorFormater } = require('../utils/errorResponse');
const { accessToken } = require('../utils/tokens');
const { validationResult } = require("express-validator")
const sendWelcomeEmail = require('../utils/sendEmail');

/* @desc: registerController takes a request and validates email and password.
 * As well, determines if user already exists via email and if one does not exists
 * a new user document is created and returned within a JSON object without 
 * the password along with a JWT.
 * @param: req, res, next
 * @returns: none
*/

module.exports.registerController = async (req, res, next) => {
    console.log('=== REGISTER CONTROLLER CALLED ===');
    console.log('Request body:', req.body);
    
    const err = validationResult(req).formatWith(errorFormater);
    if (!err.isEmpty()) {
        console.log('Validation errors:', err.array());
        const error = new ErrorResponse(err.array(), 401);
        return next(error);
    } 

    const { name, email, password } = req.body; 
    console.log('Extracted data:', { name, email, password: '***' });
    
    try {
        console.log('Checking if user exists...');
        const userExistance = await User.findOne({ email: email });
        
        if (userExistance) {
            console.log('User already exists');
            const error = new ErrorResponse("User Already Exists.", 403);
            return next(error);
        }
        
        console.log('Creating new user...');
        const user = new User({
            email,
            password,
            ...(name && { name }),
        });

        console.log('Saving user to database...');
        const data = await user.save();
        console.log('User saved successfully:', data._id);
        
        console.log('Initializing first board...');
        await initializeFirstBoard(data._id);
        console.log('Sending welcome email...');
        sendWelcomeEmail(email);
        
        data.password = undefined;
        const token = accessToken(data.id);
        console.log('Registration successful, sending response');
        return res.json({ 
            user: data,
            token: token
        });
        
    } catch (err) {
        console.log('Registration error:', err);
        return next(err);
    }
}

/* @desc: logInController takes a request and validates email and password.
 * As well, determines if user already exists via email and if one does exists
 * the retrieved user document's password is compared to the request's password. 
 * If the passwords match the response object is modified with a JSON object that contains
 * a JWT and the retrieved user document without a password. 
 * @param: req, res, next
 * @returns: none
*/
module.exports.logInController = async (req, res, next) => {
    const err = validationResult(req).formatWith(errorFormater);
    if (!err.isEmpty()) {
        const error = new ErrorResponse(err.array(), 401);
        return next(error);
    } 

    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email
        })
        if (!user) {
            const error = new ErrorResponse("User does not exist.", 401);
            return next(error);
        }
        const isMatch = await user.comparePassword(password);
        if (isMatch) {
            const token = accessToken(user.id);
            user.password = undefined;
            res.json({
                user,
                token,
            });
        } else {
            const error = new ErrorResponse("Incorrect password.", 403);
            return next(error);
        }

    } catch (err) {
        return next(err)
    }

}

/* @desc: A function to test isAuthorized function is verifying JWT correctly. 
 * @param: req, res, next
 * @returns: none
*/
module.exports.confirmThatisAuthorizedWorks = async (req, res, next) => {
    res.json({
        user: req.user
    })
}

