export default async function handler(req, res) {
  const apiKey = process.env.DUNE_API_KEY;
  const url = "https://api.dune.com/api/v1/query/3944406/results?limit=1";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Dune-API-Key": apiKey,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error from Dune API:", errorData);
      return res.status(response.status).json({ error: "Error fetching data", detail: errorData });
    }

    const data = await response.json();
    const totalPills = data.result.rows[0].total_pills;

    // Menambahkan header CORS
    res.setHeader('Access-Control-Allow-Origin', 'https://tomketloversid.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).json({ totalPills });
  } catch (error) {
    console.error("Error in request:", error);
    res.status(500).json({ error: "Error fetching data", detail: error.message });
  }
}
