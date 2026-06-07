export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path } = req.query;
  const token = req.headers.authorization?.replace('token ', '').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const githubPath = Array.isArray(path) ? path.join('/') : path;
  const url = 'https://api.github.com/repos/' + githubPath;

  try {
    const headers = {
      'Authorization': 'token ' + token,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Aabiskar-Law-Chamber-Admin'
    };

    if (req.method !== 'GET') {
      headers['Content-Type'] = 'application/json';
    }

    const options = {
      method: req.method,
      headers
    };

    if (req.method !== 'GET' && req.method !== 'DELETE') {
      options.body = JSON.stringify(req.body);
    }

    const githubRes = await fetch(url, options);
    const data = await githubRes.json();

    return res.status(githubRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
