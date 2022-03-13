const generate = ({
  uppercase = true,
  lowercase = true,
  numbers = true,
  symbols = true,
  length = 8,
  exclude = [],
}) => {
  let chars = [];
  if (uppercase) chars.push(..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
  if (lowercase) chars.push(..."abcdefghijklmnopqrstuvwxyz".split(""));
  if (numbers) chars.push(..."0123456789".split(""));
  if (symbols) chars.push(..."!@#$%^&*()".split(""));

  chars = chars.filter(c => !exclude.includes(c));

  return Array(length)
    .fill(0)
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
};

module.exports = generate;
