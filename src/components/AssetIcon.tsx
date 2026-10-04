import {
  Bitcoin,
  Building2,
  CircleDollarSign,
  Coins,
  Landmark,
} from "lucide-react";

interface AssetIconProps {
  symbol: string;
  size?: number;
}

function AssetIcon({
  symbol,
  size = 22,
}: AssetIconProps) {
  const common =
    "flex shrink-0 items-center justify-center rounded-full";

  if (symbol === "BTC") {
    return (
      <div
        className={`${common} bg-orange-500/15 text-orange-400`}
      >
        <Bitcoin size={size} />
      </div>
    );
  }

  if (symbol === "BANK") {
    return (
      <div
        className={`${common} bg-blue-500/15 text-blue-400`}
      >
        <Landmark size={size} />
      </div>
    );
  }

  if (symbol === "USDT") {
    return (
      <div
        className={`${common} bg-green-500/15 text-green-400`}
      >
        <CircleDollarSign size={size} />
      </div>
    );
  }

  if (symbol === "ETH") {
    return (
      <div
        className={`${common} bg-purple-500/15 text-purple-400`}
      >
        <Coins size={size} />
      </div>
    );
  }

  if (symbol === "SOL") {
    return (
      <div
        className={`${common} bg-cyan-500/15 text-cyan-400`}
      >
        <Coins size={size} />
      </div>
    );
  }

  return (
    <div
      className={`${common} bg-[#2b3139] text-white`}
    >
      <Building2 size={size} />
    </div>
  );
}

export default AssetIcon;