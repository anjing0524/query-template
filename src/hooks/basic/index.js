import { useQuery } from "react-query";

const getBasicData = async () => {
  const response = await fetch("/cats/data");
  if (response.ok) {
    return response.json();
  }
  return [];
};

export default function useBasicData() {
  return useQuery("basic", getBasicData);
}
