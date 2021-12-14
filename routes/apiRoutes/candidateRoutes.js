const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


// Get all candidates
router.get("/candidates", (req, res) => {
    // Was
    //const sql = `SELECT * FROM candidates`;
  
    const sql = `SELECT candidates.*, parties.name
                  AS party_name
                  FROM candidates
                  LEFT JOIN parties
                  ON candidates.party_id = parties.id`;
  
    // Lists all candidates
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return; // leave function
      }
      res.json({
        message: "success",
        data: rows,
      });
    });
  });
  
  // Gets a single candidate by their id
  router.get("/candidate/:id", (req, res) => {
    //was
    // const sql = `SELECT * FROM candidates WHERE id = ?`;
    const sql = `SELECT candidates.*, parties.name
                  AS party_name
                  FROM candidates
                  LEFT JOIN parties
                  ON candidates.party_id = parties.id
                  WHERE candidates.id = ?`;
  
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: row,
      });
    });
  });
  
  
  
  // Query for delete operation
  // ? denotes a placeholder, making this a prepared statement.
  // can execute the same statement with different values
  //  1 goes into the ? spot
  
  router.delete("/candidate/:id", (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
        // If there are no affected rows that means a candidate was not found
      } else if (!result.affectedRows) {
        res.json({
          message: "Candidate not found",
        });
      } else {
        res.json({
          message: "deleted",
          changes: result.affectedRows,
          id: req.params.id,
        });
      }
    });
  });
  
  // Create a candidate
  router.post("/candidate", ({ body }, res) => {
    // inputCheck function verifies if body param has all we need to create
    // a candidate
    const errors = inputCheck(
      body,
      "first_name",
      "last_name",
      "industry_connected"
    );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
                  VALUES (?,?,?)`;
    // params has to match VALUES
    const params = [body.first_name, body.last_name, body.industry_connected];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: body,
      });
    });
  });


  // Allow a candidate to change parties
router.put('/candidate/:id', (req, res) => {

    const errors = inputCheck(req.body, 'party_id');
    if(errors)  {
        res.status(400).json({ error: errors });
        return;
    };

    const sql = `UPDATE candidates SET party_id = ? 
                WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err,result) => {
        if(err) {
            res.status(400).json({ error: err.message });
            // check if a record was found


        } else if(!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'success', 
                data: req.body,
                changes: result.affectedRows
            });
        }
      
    });
});


  module.exports = router;