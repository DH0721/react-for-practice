import { useEffect } from "react";
import { useParams } from "react-router";

function Detail() {
  const { rank } = useParams();
  const getRank = async () => {
    const json = await (
      await fetch(`http://localhost:3000/coin/${rank}`)
    ).json();
    console.log(json);
  };
  useEffect(() => {
    getRank();
  }, []);
  return <h1>Detail</h1>;
}
export default Detail;
