module.exports.writer = (req, res) => {
    if(req.body.json) res.json(req.body.json);
    res.end();
}
