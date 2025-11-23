import React from "react";
import Card from "./Card";

function CardList({ kelas }) {
  return (
    <div
      id="card"
      className="grid grid-flow-row-dense grid-cols-3 gap-5 mt-10 mb-10"
    >
      {kelas.length > 0 ? (
        kelas.map((item) => <Card key={item.id} data={item} />)
      ) : (
        <p>Loading data kelas...</p>
      )}
    </div>
  );
}

export default React.memo(CardList);
