let express = require('express');
let app = express();
let path = require('path');
let fs = require('fs');
let PORT = 3000;
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/', function(req, res) {
    let fileDirectry = path.join(__dirname, '.files');
    fs.readdir(fileDirectry, function(err, files) {
        if (err) {
            console.log("An error occurred: " + err);
            return res.render("index", { files: [] });
        }
        let filesData = files.map((file) => {
            let filePath = path.join(fileDirectry, file); // Fix applied here
            let content = fs.readFileSync(filePath, "utf-8");
            return {
                title: file.replace(".txt", ""),
                details: content
            };
        });
        res.render("index", { files: filesData });
    });
});

app.post('/create', function (req, res) {
    const fileName = req.body.title.split(' ').join('') + '.txt';
    const filePath = path.join(__dirname, '.files', fileName);
  
    if (!fs.existsSync(path.join(__dirname, '.files'))) {
      fs.mkdirSync(path.join(__dirname, '.files'));
    }
  
    fs.writeFile(filePath, req.body.details, function (err) {
      if (err) {
        console.log('Error writing file: ' + err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/');
    });
});

app.get('/file/:filename', function(req, res) {
    const filePath = path.join(__dirname, '.files', req.params.filename + '.txt'); // Add file extension if necessary

    fs.readFile(filePath, "utf-8", function(err, filedata) {
        if (err) {
            return res.status(404).send("File not found");
        }
        res.render('show', { filename: req.params.filename, filedata: filedata });
    });
});


app.get('/edit/:filename', function(req, res) {
    res.render("edit",{filename: req.params.filename})
});



app.post('/edit', function(req, res) {
    const oldFilePath = path.join(__dirname, '.files', req.body.previous + '.txt'); 
    const newFilePath = path.join(__dirname, '.files', req.body.new + '.txt'); 

    fs.rename(oldFilePath, newFilePath, function(err) {
        if (err) {
            console.log("Error: " + err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/');
    });
});






app.listen(PORT, function() {
    console.log("Server started on port " + PORT);
}); 
