var appRouter = function(app) {

app.get("/", function(req, res) {
    res.send("Hello World");
}); 

app.post("/account", function(req, res) {
    if(!req.body.username || !req.body.password || !req.body.twitter) {
        return res.send({"status": "error", "message": "missing a parameter"});
    } else {
        return res.send(req.body);
    }
});

}
 
module.exports = appRouter;


