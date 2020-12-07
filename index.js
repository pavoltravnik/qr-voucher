const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json');
const db = low(adapter);

const express = require('express');
const app = express();
const port = 3000;

app.get('/get/:voucherID', async (req, res) => {
    try {
        const vouchers = db.get('vouchers').value();
        if(vouchers.includes(req.params.voucherID)) {
            res.status(200).json({ status: 'spent', voucher: req.params.voucherID });
        } else {
            res.status(404).json({ status: 'not found', voucher: req.params.voucherID});
        }
    } catch (err) {
        res.status(400).json({ status: 'error', error: err.message, voucher: req.params.voucherID });
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
