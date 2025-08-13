export function generateUniqueId() {
  const timestamp = Date.now(); // milliseconds since epoch
  const random = Math.floor(Math.random() * 100000); // 5-digit random number
  return parseInt(`${timestamp}${random}`);
}

console.log(generateUniqueId());