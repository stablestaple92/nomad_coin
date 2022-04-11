import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";


const Time = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 24px;
`;

interface IPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  }
}
interface PriceProps {
  coinId: string
}

function Price ({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IPrice[]>(["ohlcv", coinId, { refetchIntercal: 10000}], () => fetchCoinTickers(coinId));
  console.log(data);
  return <div>
    { isLoading ? (
      "Loading Price..."
    ) : (
      data?.map((price) => price.quotes.USD.percent_change_24h)?? [],
      <Time>
        
      </Time>
    )}
  </div>;
}

export default Price;