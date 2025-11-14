import { Link } from "react-router-dom";
export default function ButtonLink() {
  return (
    <Link className="content-center" to="/">
      <button className="border-2 p-[5px] w-10 text-center h-10"></button>
    </Link>
  );
}
