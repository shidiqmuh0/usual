export default async function handler(req, res) {
    const apiKey = process.env.DUNE_API_KEY; // Ambil kunci API dari variabel lingkungan
    const url = "https://api.dune.com/api/v1/query/3944406/results?limit=1";
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Dune-API-Key": apiKey,
        },
      });
      const data = await response.json();
      const totalPills = data.result.rows[0].total_pills;
  
      res.status(200).json({ totalPills });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  
