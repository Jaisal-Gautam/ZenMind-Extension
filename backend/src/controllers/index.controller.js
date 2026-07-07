export const home = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Seren API Running",
  });
};

export const health = (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
  })
}