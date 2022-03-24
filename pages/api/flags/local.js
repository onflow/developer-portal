export default function handler(req, res) {
  res.status(200).json({ flags: { hello: "hello flags" } });
}
