// * Copied from internet
export async function generateUUID() {
  // Use the crypto module to generate a random array of bytes
  var array = new Uint8Array(16);
  crypto.getRandomValues(array);

  // Convert the array of bytes to a hexadecimal string
  var uuid = "";
  for (var i = 0; i < array.length; i++) {
    uuid += array[i].toString(16).padStart(2, "0");
  }

  // Add hyphens to the UUID to separate it into groups
  uuid = uuid.substring(0, 8) + "-" + uuid.substring(8, 4) + "-" + uuid.substring(12, 4) + "-" + uuid.substring(16, 4) + "-" + uuid.substring(20, 12);

  return uuid;
}
