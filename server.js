import express from "express";
import QRCode from "qrcode";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/generateQR", async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Input is required" });
    }

    const qrCodeImage = await QRCode.toDataURL(input);

    res.status(200).json({ qrCodeUrl: qrCodeImage });
  } catch (err) {
    console.error("Error generating QR code:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
