const checkSecretHeader = (headers) => {
  const secretHeader = headers["x-portfolio-secret"];

  if (secretHeader === "wildcodeschool") {
    return {
      unlocked: true,
      message: "La princesse est dans un autre château 🏰",
    };
  }

  return { unlocked: false };
};

module.exports = {
  checkSecretHeader,
};
