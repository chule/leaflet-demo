export default function timeDifference(startTime, endTime) {
  // Convert time strings to Date objects
  let start = new Date("1970-01-01T" + startTime + "Z");
  let end = new Date("1970-01-01T" + endTime + "Z");

  // Calculate the difference in milliseconds
  let diff = end - start;

  // Convert milliseconds to hours, minutes, and seconds
  let hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  let mins = Math.floor(diff / 1000 / 60);
  diff -= mins * 1000 * 60;
  let secs = Math.floor(diff / 1000);

  // Return the result
  return `${hours < 10 ? "0" + hours : hours}:${
    mins < 10 ? "0" + mins : mins
  }:${secs < 10 ? "0" + secs : secs}`;
}
