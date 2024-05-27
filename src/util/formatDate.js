export default function formatDate(date) {
  let today = new Date();
  const taskDate = new Date(date);

  let timeDifference = taskDate.getTime() - today.getTime();
  let daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference === 1) {
    return "Tomorrow";
  } else if (daysDifference === -1) {
    return "Yesterday";
  } else {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return taskDate.toLocaleDateString("en-GB", options);
  }
}
