import axios from "axios";

export const queryDate = async (values) =>
  await axios.post("http://localhost:1000" + "/api/query", values);

export const createEvent = async (values) =>
  await axios.post("http://localhost:1000" + "/api/event", values);

export const listEvent = async () =>
  await axios.get("http://localhost:1000" + "/api/event");

export const updateEvent = async (values) =>
  await axios.put("http://localhost:1000" + "/api/event", values);

export const removeEvent = async (values) =>
  await axios.delete("http://localhost:1000" + "/api/event/" + values);

export const handleCurrentMonth = async (values) =>
  await axios.post("http://localhost:1000" + "/api/current-month", values);

export const updateImage = async (values) =>
  await axios.post("http://localhost:1000" + "/api/update-image", values);
