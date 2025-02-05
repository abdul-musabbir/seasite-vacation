export const GetData = async () => {
  const data = await fetch("http://localhost:5000/");
  return data.json();
};
