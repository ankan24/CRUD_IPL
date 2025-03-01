const express = require('express');
const router = express.Router();
const Club = require('../models/Club.model.js');


router.get('/', async (req, res, next) => {
    try {
        const docs = await Club.find(); 
        res.render('home', { clubs: docs });
    } catch (err) {
        console.error('Fetch error:', err);
        res.status(500).send('An error occurred while fetching clubs.');
    }
});


router.post('/add', async (req, res, next) => {
    try {
        const { name, players, coach } = req.body;
        console.log("Received Data:", { name, players, coach });

        const newClub = new Club({
            name,
            players,
            coach
        });

        await newClub.save();
        console.log('Save successful');
        res.redirect('/');
    } catch (err) {
        console.error('Save error:', err);
        res.status(500).send('An error occurred while saving the club.');
    }
});


// router.get('/edit/:id',(req, res ,next) => {
//     console.log(req.params.id);
//     Club.findByIdAndUpdate({_id: req.params.id}, req.body ,{new : true}, (err,docs)=>{
//         if(err){
//             console.error('Update error:', err);
//             res.status(500).send('An error occurred while updating the club.');
//         }else{
//             res.render('edit');
//         }
//     } )
//     res.render('edit' , {club : docs})
// })
router.get('/edit/:id', async (req, res, next) => {
    try {
        const updatedClub = await Club.findByIdAndUpdate(
            { _id: req.params.id }, 
            req.body, 
            { new: true }  
        );

        if (!updatedClub) {
            return res.status(404).send('Club not found.');
        }

        console.log('Club updated successfully:', updatedClub);
        res.render('edit', { club: updatedClub });  
    } catch (err) {
        next(err);
        console.error('Update error:', err);
        res.status(500).send('An error occurred while updating the club.');
    }
});


// router.post('/edit/:id',(req,res,next)=>{
//     Club.findByIdAndUpdate({_id: req.params.id}, req.body, (err,docs)=>{
//         if(err){
//             console.error('Update error:', err);
//             res.status(500).send('An error occurred while updating the club.');
//             next(err);
//         }else{
//             res.redirect('/');
//         }
//     } )
// })
router.post('/edit/:id', async (req, res, next) => {
    try {
        const updatedClub = await Club.findByIdAndUpdate(
            req.params.id, 
            req.body,       
            { new: true }  
        );
        if (!updatedClub) {
            return res.status(404).send('Club not found.');
        }
        res.redirect('/');
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).send('An error occurred while updating the club.');
    }
});


// router.get('/delete/:id',(req, res , next) => {
//     Club.findByIdAndDelete({_id : req.params.id},(err,docs)=>{
//         if(err){
//             console.error('Delete error:', err);
//             res.status(500).send('An error occurred while deleting the club.');
//             next(err);
//         }else{
//             console.log('Successfully deleted the club');
//             res.redirect('/');
//         }
//     })
// })
router.get('/delete/:id', async (req, res, next) => {
    try {
        const deletedClub = await Club.findByIdAndDelete(req.params.id);
        if (!deletedClub) {
            return res.status(404).send('Club not found.');
        }
        console.log('Successfully deleted the club');
        res.redirect('/');
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).send('An error occurred while deleting the club.');
    }
});


module.exports = router;
