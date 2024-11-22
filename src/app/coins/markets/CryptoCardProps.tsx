import CryptoCard from "./CryptoCard";

export default function CryptoList() {
  const cryptocurrencies = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      currentPrice: 45000.25,
      change24h: 5.67,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      currentPrice: 3000.50,
      change24h: -3.45,
    },
    
  ];

  return(
    <>
    <div className="grid grid-cols-5 gap-7">

    {
        cryptocurrencies.map((crypto, index)=>{
            return(
                <CryptoCard
                key={index}
                name = {crypto.name}
                currentPrice={crypto.currentPrice}
                symbol={crypto.symbol}
                />
            )
        })

    }
    </div>

    </>
  )
}
