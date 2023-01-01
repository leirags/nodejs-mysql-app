const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn }  = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    //res.send('Form');
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = { 
        title, 
        url, 
        description,
        user_id : req.user.id
    };
    // console.log(newLink);
    await pool.query('INSERT INTO links set ?', [newLink])
    // res.send('Received...');
    // res.render('links/add');
    req.flash('success', 'Link saved successfully');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    console.log(links);
    //res.send('Listas was here...');
    res.render('links/list', { links: links });
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    console.log(req.params.id);
    const { id } = req.params;
    if (id) {
        await pool.query('DELETE FROM links WHERE id = ?', [id]);
        req.flash('success', 'Link deleted successfully');
    }
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    console.log(req.params.id);
    const { id } = req.params;
    if (id) {
        const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
        console.log(links[0]);
        res.render('links/edit', { link: links[0] });
    } else {
        res.redirect('/links');
    }
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    console.log(req.params.id);
    const { id } = req.params;
    if (id) {
        const { title, url, description } = req.body;
        const editLink = { 
            title, 
            url, 
            description 
        };
        // console.log(editLink);
        await pool.query('UPDATE links set ? WHERE id = ?', [editLink, id]);
        req.flash('success', 'Link edit saved successfully');
        //res.send('Updating...');
    }
    res.redirect('/links');
});

module.exports = router;
 