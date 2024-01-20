import { useEffect, useState } from "react";
import { Tile, FilterBar } from "components";
import { data } from "../data/Assessment";

import StyleWrapper from "./dashboard.ctr.style";

const DashboardCTR: React.FC = () => {
  const [filteredItems, setFilteredItems] = useState(null);
  const resultsFetched = (data) => {
    setFilteredItems(data);
  };

  useEffect(() => {
    setFilteredItems(data);
  }, []);

  return (
    <StyleWrapper>
      <header className="header-container">
        <FilterBar resultsFetched={resultsFetched} />
      </header>

      <main className="body-container">
        {filteredItems?.map((item: any) => (
          <Tile key={item?.id} data={item} />
        ))}
      </main>
    </StyleWrapper>
  );
};

export default DashboardCTR;
