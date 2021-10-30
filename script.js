var express = require('express');
const { Octokit } = require("@octokit/rest");
var bodyParser = require('body-parser');

var app = express();

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN
});

app.post('/save', bodyParser.text(), async function(req, res) {
	var content = req.body;
	console.log(content);
	var name =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	try {
		const { data } = await octokit.repos.createOrUpdateFileContents({
			owner: "Aspie96",
			repo: "mazik-files",
			path: "files/" + name,
			message: "Add file " + name,
			content: Buffer.from(content, "utf8").toString("base64"),
			committer: {
				name: "Octokit Bot",
				email: "octokit-bot@example.com",
			},
			author: {
				name: "Octokit Bot",
				email: "octokit-bot@example.com",
			}
		});
		console.log(data);
	} catch (err) {
		console.error(err);
	}
});

app.listen(process.env.PORT, process.env.IP () => {
	console.log("Example app listening at http://localhost:${port}")
})
